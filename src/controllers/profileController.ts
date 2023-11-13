import { Request, Response } from "express";
import axios from "axios";

interface DecodedToken {
    data: string;
}

export class ProfileController {
    getProfile(){
        return async (req: Request, res: Response) => {
            
            const result = await axios.get(`http://127.0.0.1:8080/public/profile?user_id=${req.body.idUser}`, {
                headers: {
                    'Access-Control-Allow-Origin': true,
                },
                // proxy: {
                //     host: 'localhost',
                //     port: 8080,
                // }
            }
            ).catch((err) => {
                console.log(err)
            });
            // const result = {name: "John Doe"};
            return res.status(200).send({ result });
        };
    }   
}
