import { Router, Application } from "express";
import OAuth2 from "../Structures/Oauth2"
import { Client } from "discord.js";
import EnsureAuth from "../Middlewares/EnsureAuthentication";
import API_Responses from "../Functions/ResJson";
import UserInformation from "../../Interfaces/Discord/UserInformation";

export default class UserRouter {
    protected server: Application;
    protected router: Router;
    protected oauth: OAuth2;
    protected client: Client;

    public constructor(server: Application, oauth: OAuth2, client: Client) {
        this.server = server;
        this.router = Router();
        this.oauth = oauth;
        this.client = client;
        this.server.use("/api", EnsureAuth(this.oauth), this.router);

        this.router.get("/get/user-information", async (req, res) => {
            const ID = (await this.oauth.resolveInformation(req)).id;
            const user = this.client.users.cache.find(r => r.id === ID);
            if(!user)
            {
                return API_Responses.API_Error("Unable to find user")(res);
            }

            let result: UserInformation = 
            {
                avatar: user.avatar,
                bot: user.bot,
                createdAt: user.createdAt,
                createdTimestamp: user.createdTimestamp,
                defaultAvatarURL: user.defaultAvatarURL,
                id: user.id,
                presence: user.presence,
                tag: user.tag,
                username: user.username
            }

            return API_Responses.API_Success(result)(res);
        });
    }
}