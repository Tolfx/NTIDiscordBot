import { Router, Application } from "express";
import OAuth2 from "../Structures/Oauth2"
import { Client } from "discord.js";
import API_Responses from "../Functions/ResJson";
import EnsureAuth from "../Middlewares/EnsureAuthentication";
import AW from "../../Lib/Async";
import Classes from "../../Models/Classes";
import { IClasses } from "../../Interfaces/Classes";
import ConfigLesson from "../../Models/LessonConfig";

export default class ConfigRouter {
    protected server: Application;
    protected router: Router;
    protected oauth: OAuth2;
    protected client: Client;

    constructor(server: Application, oauth: OAuth2, client: Client) {
        this.server = server;
        this.router = Router();
        this.oauth = oauth;
        this.client = client;
        this.server.use("/config", EnsureAuth(this.oauth), this.router);

        this.server.post("/create", async (req, res) => {
            const [User, U_Error] = await AW((this.oauth.resolveInformation(req)));

            /**
             * !Not possible.. fix this?
             * @Tolfx
             */
            if(!User)
                return;

            if(U_Error)
                return API_Responses.API_Error("Something went wrong while fetching user information")(res);

            let { name, c_class, length, min_cam_length, min_stream_length, min_msg_length, min_mobile_time, hall } = req.body;

            if(!name && !c_class && length)
            {
                API_Responses.API_Error("Missing values, please ensure everything got included")(res);
            }

            // Check if this class exits.
            const [Class, C_Error] = await AW<IClasses>(Classes.findOne({ name: c_class }))

            if(C_Error)
                return API_Responses.API_Error("Something went wrong while fetching classes information")(res);

            if(!Class)
                return API_Responses.API_Error(`Unable to locate ${c_class} in our database, try again!`)(res);

            // Create new config.
            const [newLesson, L_Error] = await AW(new ConfigLesson({
                students: Class.students,
                name: name,
                teacherId: User.id,
                length: length,
                min_camera: min_cam_length ?? null,
                min_streaming: min_stream_length ?? null,
                min_messages: min_msg_length ?? null,
                min_mobile_time: min_mobile_time ?? null,
                hall: hall ?? "100",
            }).save())

            if(L_Error)
                return API_Responses.API_Error("Something went wrong while creating new config")(res);
                
            if(!newLesson)
                return API_Responses.API_Error("Something went wrong.. try again later")(res);

            return API_Responses.API_Success(`${c_class} was succesfully created.`)(res);
        })

    }
}