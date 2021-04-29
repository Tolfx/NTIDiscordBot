require("dotenv").config();
import StartDiscordBot from "./Discord/Main";
import { MongoDB_URL } from "./Config";
import mongoose from "mongoose";
import log from "./Lib/Logger";

mongoose.connect(MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false
});

if(process.env.JENKINS || process.env.GITHUB_ACTION)
{
    setTimeout(() => {
        log.info(`Exiting build :)`)
        process.exit(0); // <-- Exit with code 0
    }, 30000) // <--- 30 sec
}

StartDiscordBot();