import { Router, Application } from "express";
import OAuth2 from "../Structures/Oauth2"
import { Client } from "discord.js";
import API_Responses from "../Functions/ResJson";
import jwt from "jsonwebtoken";
import { JWT_Access_Token } from "../../Config";

export default class ValidationRouter {
    protected server: Application;
    protected router: Router;
    protected oauth: OAuth2;
    protected client: Client;

    constructor(server: Application, oauth: OAuth2, client: Client) {
        this.server = server;
        this.router = Router();
        this.oauth = oauth;
        this.client = client;
        this.server.use("/validate", this.router);

        this.router.get("/token", (req, res) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader;
            if (token == null)
                return API_Responses.API_Error(`Missing token in headers.`, 401)(res);
        
            jwt.verify(token, JWT_Access_Token, (err, token) => {
                if (err) 
                    return API_Responses.API_Error(false)(res);

                API_Responses.API_Success(true)(res);
            });
        });

    }
}