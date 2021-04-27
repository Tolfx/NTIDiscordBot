import express from "express";
import session from "express-session";
import cors from "cors";
import methodOverride from "method-override";
import { ExpressPort as PORT, SecretAuth } from "../Config";
import OAuthRouter from "./Routers/OauthRouter";
import OAuth2 from "./Structures/Oauth2";
import log from "../Lib/Logger";
import { Client } from "discord.js";
import UserRouter from "./Routers/User";
import API_Responses from "./Functions/ResJson";

declare module 'express-session' {
    export interface SessionData {
      token: { [key: string]: any };
    }
}

export default class ExpressServer
{
    private server = express();
    private client: Client;
    private Oauth: OAuth2;

    constructor(client: Client)
    {
        this.client = client;
        this.server = express();
        this.Oauth = new OAuth2(this.client);

        this.server.use(cors({
            origin: true,
            credentials: true
        }));
    
        this.server.use(session({
            secret: SecretAuth,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: "auto",
                sameSite: false,
                httpOnly: false,
                maxAge: 6048e5
            }
        }));
    
        this.server.use(methodOverride('_method'));
        this.server.use(express.urlencoded({ extended: true }));

        this.server.use((req, res, next) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Powered-By', 'Tolfx Inc');

            next();
        });
    
        // Routes goes here..
        new OAuthRouter(this.server, this.Oauth, this.client);
        new UserRouter(this.server, this.Oauth, this.client);
    
        this.server.listen(PORT, () => log.info(`Server listing on port: ${PORT}`, log.trace()));
    }
};