import { Router, Application } from "express";
import fetch from "node-fetch";
import OAuth2 from "../Structures/Oauth2"
import { callbackURL, clientID, clientSecret, redirectUri } from "../../Config"
import { URLSearchParams } from "url";
import { Client } from "discord.js";

export default class OAuthRouter {
    protected server: Application;
    protected router: Router;
    protected oauth: OAuth2;
    protected client: Client;

    constructor(server: Application, oauth: OAuth2, client: Client) 
    {
        this.server = server;
        this.router = Router();
        this.oauth = oauth;
        this.client = client;
        this.server.use("/api", this.router);

        this.router.get("/oauth/callback", (req, res) => {
            fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                //@ts-ignore
                body: new URLSearchParams({
                    "client_id": clientID,
                    "client_secret": clientSecret,
                    "grant_type": "authorization_code",
                    "code": req.query.code,
                    "redirect_uri": callbackURL,
                    "scope": "identify"
                })
            }).then(response => response.json())
            .then(response => { 
                req.session.token = response["access_token"];
                return res.redirect(redirectUri)
            }).catch(e => res.redirect(redirectUri))
        });

        this.router.get("/oauth/login", (req, res) => {
            return res.redirect(`https://discord.com/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(callbackURL)}&response_type=code&scope=${encodeURIComponent("identify guilds")}`)
        });

        this.router.get("/oauth/logout", (req, res) => {
            req.session.destroy(() => null)
            return res.redirect(redirectUri)
        });
    }
}