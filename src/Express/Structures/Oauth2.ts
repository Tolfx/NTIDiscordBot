import { Request } from "express";
import fetch from "node-fetch"
import { APIUser } from "../../Interfaces/Oauth2";

export default class OAuth2 {
    protected guilds: object | any;

    public constructor() {
        this.guilds = new Object();
    }

    public async resolveInformation(req: Request): Promise<APIUser | null> {
        if (!req.session.token) {
            return null
        }

        const userReq = await fetch("https://discord.com/api/users/@me", {
            headers: {
                "Authorization": `Bearer ${req.session.token}`
            }
        })

        const user = await userReq.json();
        if(!user.id) {
            return null;
        } 

        if(!this.guilds[user.id]) {
            const guildReq = await fetch("https://discord.com/api/users/@me/guilds", {
                headers: {
                    "Authorization": `Bearer ${req.session.token}`
                }
            })

            const guildsRes = await guildReq.json();

            this.guilds[user.id] = guildsRes;

            setTimeout(() => {
                delete this.guilds[user.id];
            }, 3e5)
        }

        return {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar,
        }
    }
}