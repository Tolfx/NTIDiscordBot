require("dotenv").config();
import StartDiscordBot from "./Discord/Main";
import { MongoDB_URL } from "./Config";
import mongoose from "mongoose";

mongoose.connect(MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false
});

if(process.env.JENKSIN)
{
    setTimeout(() => {
        process.exit(0); // <-- Exit with code 0
    }, 60000) // <--- 1 min
}

StartDiscordBot();