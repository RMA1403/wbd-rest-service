import { Request, Response } from "express";
import axios from "axios";

export class ProfileController {
    getProfile(){
        return async (req: Request, res: Response) => {
            const result = await axios.get(`${process.env.PHP_URL}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            return res.status(200).send({ podcasts: result });
        };
    }
}
