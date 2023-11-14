import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../lib/verifyToken";

export class AuthController {
  createToken() {
    return async (req: Request, res: Response) => {
      const secret = process.env.JWT_SECRET || "";

      const token = jwt.sign(
        {
          data: req.body.idUser || "",
        },
        secret,
        { expiresIn: 60 * 10 }
      );

      return res.status(200).json({ token });
    };
  }

  verify() {
    return async (req: Request, res: Response) => {
      try {
        const bearerToken = req.headers.authorization?.split(" ")[1] || "";

        if (bearerToken === "") {
          return res.status(200).json({ message: "error" });
        }

        const token = await verifyToken(bearerToken);

        return res.status(200).json({ message: token });
      } catch (err) {
        return res.status(200).json({ message: "error" });
      }
    };
  }
}
