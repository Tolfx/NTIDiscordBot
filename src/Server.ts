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

StartDiscordBot();