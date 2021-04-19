import { Client, Collection  } from "discord.js";
import CommandHandler from "./Handler/Commands";
import RunEvent from "../Interfaces/RunEvent"
import { Discord_Prefix } from "../Config";
const prefix = Discord_Prefix;

/*

Guide: How to create a new command.
    Every command goes to "Commands" folder,
    There you have different categories which can also be created,
    by creating a new folder with a new name.

    Then when you want to create a new command you create a new file,
    in a category, then you must export two very important stuff.

    1. You need to export "name" which is an array of strings which will identify
        the command name when executed.
    2. You need to export a function called "run" which takes in interface EventRun,
        which contains arguments that you'll need to subtain the command.
    
    Once all you've done this correctly it should work once the bot is started :D

*/


export default function StartDiscordBot()
{
    const client = new Client({
        disableMentions: "none"
    }),
    commands: Collection<string[], (event: RunEvent) => any> = new Collection();


    CommandHandler(commands);

    client.once("ready", () => {
        console.log("Bot is ready.");
    });

    
    client.on("mesasge", (message) => {
        //If the bot is sending it self a message
        if (message.author.bot) return;
        //If the message wasn't from the guild (aka dm) return
        if (!message.guild) return;
        //If the messages doesnt start with prefix ignore it
        if (!message.content.startsWith(prefix)) return;

          //The args /shrug
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        //Find what command the user is doing
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = commands.get(cmd);

        if (command) {
            command({
                client,
                message,
                args
            });
        };
    });

    client.login(process.env.DISCORD_TOKEN ?? "");
};