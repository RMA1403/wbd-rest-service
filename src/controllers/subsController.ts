import { Request, Response, Router } from "express";
import axios from "axios";
import xml2js from "xml2js";

export class SubsController {
    extendSubs(){
        return async (req: Request, res: Response) => {
            const { idUser } = req.body;

            const soapRes = await axios.post(
                `${process.env.SOAP_URL}/subscription`,
                `
                  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://services.soapserver/">
                    <soap:Header>
                      <tns:apiKey>${process.env.REST_SOAP_KEY}</tns:apiKey>
                    </soap:Header>
                    <soap:Body>
                      <tns:extendSubscription>
                        <idUser>${idUser}</idUser>
                        <duration>${1000}</duration>
                      </tns:extendSubscription>
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
              const subscribeRes = xmlRes["S:Envelope"]["S:Body"][0]["ns2:checkSubscriptionResponse"][0]["return"][0];
            return res.status(200).json({ result: subscribeRes })
        }
    }
}