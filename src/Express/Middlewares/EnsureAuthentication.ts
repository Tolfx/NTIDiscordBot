import { Request, Response, NextFunction } from "express"
import API_Responses from "../Functions/ResJson";
import OAuth2 from "../Structures/Oauth2";

export default function EnsureAuth(
    oauth: OAuth2,
)
{
    return (req: Request, res: Response, next: NextFunction) => {
        const User = oauth.resolveInformation(req);
        if(!User)
        {
            API_Responses.API_Error("User is not authenticated", 401)(res)
        }
    
        next();
    }

}