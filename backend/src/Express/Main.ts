import express from "express";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import methodOverride from "method-override";
import { ExpressPort as PORT } from "../Config";
import OAuth2 from "./Structures/Oauth2";
import log from "../Lib/Logger";
import { Client } from "discord.js";
import UserRouter from "./Routers/User";
import ValidationRouter from "./Routers/Validation";
import LessonRouter from "./Routers/Lessons";
import ConfigRouter from "./Routers/Config";

declare module 'express-session' {
    export interface SessionData {
      token: { [key: string]: any };
    }
}

declare module 'express' {
    export interface Request {
      discord_token?: object;
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

        //Limiter, to reduce spam if it would happen.
        const limiter = rateLimiter({
            // 15 min
            windowMs: 15 * 60 * 1000,
            max: 500
        });

        this.server.use(limiter);
    
        this.server.use(methodOverride('_method'));
        this.server.use(express.urlencoded({ extended: true }));

        this.server.use((req, res, next) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('X-Powered-By', 'Tolfix');

            next();
        });
    
        // Routes goes here..
        new UserRouter(this.server, this.Oauth, this.client);
        new ValidationRouter(this.server, this.Oauth, this.client);
        new LessonRouter(this.server, this.Oauth, this.client);
        new ConfigRouter(this.server, this.Oauth, this.client);
    
        this.server.listen(PORT, () => log.info(`Server listing on port: ${PORT}`, log.trace()));
    }
};