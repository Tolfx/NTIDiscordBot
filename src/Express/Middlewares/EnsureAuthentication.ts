import { Request, Response, NextFunction } from "express"
import API_Responses from "../Functions/ResJson";
import OAuth2 from "../Structures/Oauth2";
import jwt from "jsonwebtoken";
import { JWT_Access_Token } from "../../Config";

export default function EnsureAuth(
    oauth: OAuth2,
)
{
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return API_Responses.API_Error(`Missing token in headers.`, 401)
    
        jwt.verify(token, JWT_Access_Token, (err, token) => {
            if (err) return API_Responses.API_Error(`Unauthorized user.`, 403);
            req.discord_token = token;
            next();
        })
    }

}