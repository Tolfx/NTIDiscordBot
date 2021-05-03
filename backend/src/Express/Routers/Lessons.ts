import { Router, Application } from "express";
import OAuth2 from "../Structures/Oauth2"
import { Client } from "discord.js";
import API_Responses from "../Functions/ResJson";
import jwt from "jsonwebtoken";
import { JWT_Access_Token } from "../../Config";

export default class LessonRouter {
    protected server: Application;
    protected router: Router;
    protected oauth: OAuth2;
    protected client: Client;

    constructor(server: Application, oauth: OAuth2, client: Client) {
        this.server = server;
        this.router = Router();
        this.oauth = oauth;
        this.client = client;
        this.server.use("/lesson", this.router);

        this.router.get("/get/info/:lesson", (req, res) => {
            res.send(`${req.params.lessons}`)
        });

    }
}