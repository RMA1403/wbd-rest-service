import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

interface DecodedToken {
    data: string;
}

export class ProfileController {
    getProfile(){
        return async (req: Request, res: Response) => {
            
            const result = await axios.get(`${process.env.VITE_PHP_URL}/public/profile?user_id=${req.body.idUser}`);
            // const result = {name: "John Doe"};
            return res.status(200).send({ result });
        };
    }   
}
