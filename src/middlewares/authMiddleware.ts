import { NextFunction, Request, Response } from "express";
import verifyToken from "../lib/verifyToken";

export default class AuthMiddleware {
  verify() {
    return async function authMiddleware(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const bearerToken = req.headers.authorization?.split(" ")[1] || "";

        if (bearerToken === "") {
          return res.status(401).json({ message: "invalid token" });
        }
        console.log("kiw kiw");
        const token = await verifyToken(bearerToken);
        
        req.body.idUser = (token as any).data;
        next();
      } catch (err) {
        return res.status(401).json({ message: "invalid token" });
      }
    };
  }
}
