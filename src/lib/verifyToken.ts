import jwt from "jsonwebtoken";

export default async function verifyToken(jwtToken: string) {
  if (!jwtToken) {
    return {};
  }

  const jwtSecret = process.env.JWT_SECRET || "";

  return new Promise((resolve, reject) =>
    jwt.verify(jwtToken, jwtSecret, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    )
  );
}
