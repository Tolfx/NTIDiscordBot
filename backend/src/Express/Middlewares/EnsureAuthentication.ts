import { Request, Response, NextFunction } from "express"
import API_Responses from "../Functions/ResJson";
import OAuth2 from "../Structures/Oauth2";
import jwt from "jsonwebtoken";
import { JWT_Access_Token } from "../../Config";

export default function EnsureAuth(oauth: OAuth2)
{
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader;
        if (token == null)
            return API_Responses.API_Error(`Missing token in headers.`, 401)(res);
    
        jwt.verify(token, JWT_Access_Token, async (err, token) => {
            if (err) 
                return API_Responses.API_Error(`Unauthorized user.`, 403)(res);
            //@ts-ignore
            req.discord_token = token.data;

            const User = await oauth.resolveInformation(req);
            if(!User)
            {
                return API_Responses.API_Error("User is not authenticated", 403)(res)
            }
            else 
                return next();
        })
    }
}