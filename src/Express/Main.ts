import express from "express";
import session from "express-session";
import cors from "cors";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import { ExpressPort as PORT, SecretAuth } from "../Config"
import OAuthRouter from "./Routers/OauthRouter";
import OAuth2 from "./Structures/Oauth2";
import log from "../Lib/Logger";

declare module 'express-session' {
    export interface SessionData {
      token: { [key: string]: any };
    }
}

export default function StartExpressServer()
{
    const server = express();

    server.use(cors({
        origin: true,
        credentials: true
    }));

    server.use(session({
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

    server.use(expressLayouts);
    server.set('view engine', 'ejs');
    server.use(express.static('public'));
    server.use(methodOverride('_method'));
    server.use(express.urlencoded({ extended: true }));

    const Oauth = new OAuth2();

    // Routes goes here..
    new OAuthRouter(server, Oauth);

    server.listen(PORT, () => log.info(`Server listing on port: ${PORT}`, log.trace()));
};