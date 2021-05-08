require("dotenv").config();
import StartDiscordBot from "./Discord/Main";
import { MongoDB_URL } from "./Config";
import mongoose from "mongoose";
import log from "./Lib/Logger";
import fs from "fs";
import { stripIndent } from "common-tags";

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

fs.readFile(process.cwd()+"/.env", (err, data) => {
    if(!data)
    {
        log.error(`Missing .env file.. creating one.`);

        const content = stripIndent`
        DISCORD_TOKEN=
        SECRETAUTH=
        DISCORD_CLIENT_ID=
        DISCORD_CLIENT_SECRET=
        MONGODB_URL=
        CALLBACK_URL=
        ACCESS_TOKEN_SECRET=`

        fs.appendFile(process.cwd()+"/.env", content, (err) => {
            if (err) throw err;
            log.info(`Succesfully created file.`);
        });
    }
});