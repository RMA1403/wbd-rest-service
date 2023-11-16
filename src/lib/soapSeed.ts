import axios from "axios";

export default async function soapSeed() {
  await axios.post(
    `${process.env.SOAP_URL}/subscription`,
    `
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://services.soapserver/">
        <soap:Header>
          <tns:apiKey>${process.env.REST_SOAP_KEY}</tns:apiKey>
        </soap:Header>
        <soap:Body>
          <tns:seedSubscription>
          </tns:seedSubscription>
        </soap:Body>
      </soap:Envelope>
  `,
    {
      headers: {
        "Content-Type": "text/xml",
      },
    }
  );
}
