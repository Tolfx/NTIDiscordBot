import { Router, Application } from "express";
import OAuth2 from "../Structures/Oauth2"
import { Client } from "discord.js";
import API_Responses from "../Functions/ResJson";
import Lessons from "../../Models/Lesson";
import EnsureAuth from "../Middlewares/EnsureAuthentication";
import Lesson from "../../Models/Lesson";

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
        this.server.use("/lesson", EnsureAuth(this.oauth), this.router);

        this.router.get("/get/:lessonId", (req, res) => {
            const lessonId = req.params.lessonId;
            Lessons.findOne({ _id: lessonId }).then(lesson => {
                if(!lesson)
                    return API_Responses.API_Error(`Unable to find lesson with id ${lessonId}`, 204)(res);

                return API_Responses.API_Success(lesson)(res);
            }).catch(e => {
                API_Responses.API_Error(`Something went wrong, try again later.`)(res);
            });
        });

        this.router.get("/get/all-lessons", async (req, res) => {
            const userId = (await this.oauth.resolveInformation(req)).id;
            Lessons.find({ teacherId: userId }).then(lesson => {
                if(!lesson)
                    return API_Responses.API_Error(`Unable to find lessons with this user.`, 204)(res);

                return API_Responses.API_Success(lesson)(res);
            }).catch(e => {
                API_Responses.API_Error(`Something went wrong, try again later.`)(res);
            });
        });

        // this.router.get("/get/students/:lessonId", async (req, res) => {

        // });
    }
}