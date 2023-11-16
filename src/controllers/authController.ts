import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../lib/verifyToken";
import axios from "axios";
import xml2js from "xml2js";

export class AuthController {
  createToken() {
    return async (req: Request, res: Response) => {
      const secret = process.env.JWT_SECRET || "";

      const token = jwt.sign(
        {
          data: req.body.idUser || "",
        },
        secret,
        { expiresIn: 60 * 600 }
      );

      return res.status(200).json({ token });
    };
  }

  verify() {
    return async (req: Request, res: Response) => {
      try {
        const bearerToken = req.headers.authorization?.split(" ")[1] || "";

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

        return res.status(200).json({ message: token });
      } catch (err) {
        return res.status(200).json({ message: "invalid token" });
      }
    };
  }
}
