import { Request, Response } from "express";
import fetch from "node-fetch";

export class ProfileController {
    getProfile(){
        return async (req: Request, res: Response) => {
            const result = await fetch(`http://tubes-php-app:80/public/profile?user_id=${req.body.idUser}`, {
                headers: {
                    'api_key': `${process.env.REST_PHP_KEY}`
                },
            });
            const resultJson = await result.json();
            // const result = {name: "John Doe"};
            return res.status(200).send(resultJson);
        };
    } 

    updateProfile(){
        return async (req: Request, res: Response) => {
            const result = await fetch(`http://tubes-php-app:80/public/profile?user_id=${req.body.idUser}`, {
                method: "post",
                headers: {
                    'api_key': `${process.env.REST_PHP_KEY}`
                },
                body: JSON.stringify({
                    name: req.body.name,
                    username: req.body.username,
                }),
            });
            
            const resultJson = await result.json();
            return res.status(result.status).send(resultJson);
        };
    }
}
