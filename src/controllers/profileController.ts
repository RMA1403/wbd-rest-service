import { Request, Response } from "express";
import fetch from "node-fetch";

export class ProfileController {
    getProfile(){
        return async (req: Request, res: Response) => {
            
            const result = await fetch(`http://tubes-php-app:80/public/profile?user_id=${req.body.idUser}`, {
                headers: {
                    'api_key': `${process.env.API_KEY}`
                },
            });
            console.log(result);
            const resultJson = await result.json();
            // const result = {name: "John Doe"};
            return res.status(200).send(resultJson);
        };
    } 
                
    updateProfile(){
        return async (req: Request, res: Response) => {
            const result = await fetch(`http://tubes-php-app:80/public/profile?user_id=${req.body.idUser}`, {
                method: 'POST',
                body: JSON.stringify(req.body),
                headers: {
                    'api_key': `${process.env.API_KEY}`
                },
            });
            const cy = {'message': 'disni'}
            return res.status(200).send(cy);
        };
    }
}
