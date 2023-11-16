import { NextFunction, Request, Response } from "express";
import verifyToken from "../lib/verifyToken";
import axios from "axios";
import xml2js from "xml2js";

export default class AuthMiddleware {
  verify() {
    return async function authMiddleware(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const bearerToken = req.headers.authorization?.split(" ")[1] || "";
        // console.log(req.headers);

        // Validate jwt token
        if (bearerToken === "") {
          return res.status(401).json({ message: "invalid token" });
        }
        const token = await verifyToken(bearerToken);

        const soapRes = await axios.post(
          `${process.env.SOAP_URL}/subscription`,
          `
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://services.soapserver/">
              <soap:Header>
                <tns:apiKey>${process.env.REST_SOAP_KEY}</tns:apiKey>
              </soap:Header>
              <soap:Body>
                <tns:checkSubscription>
                  <idUser>${(token as any).data}</idUser>
                </tns:checkSubscription>
              </soap:Body>
            </soap:Envelope>
        `,
          {
            headers: {
              "Content-Type": "text/xml",
            },
          }
        );

        const xmlRes = await xml2js.parseStringPromise(soapRes.data);
        const subscribeRes =
          xmlRes["S:Envelope"]["S:Body"][0]["ns2:checkSubscriptionResponse"][0][
            "return"
          ][0];

        // Check user subscription
        if (subscribeRes !== "subscribed") {
          return res.status(403).json({ message: "user not subscribed" });
        }

        req.body.idUser = (token as any).data;
        next();
      } catch (err) {
        return res.status(401).json({ message: "invalid token" });
      }
    };
  }
}
