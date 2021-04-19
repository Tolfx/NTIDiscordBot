import { Client, Collection  } from "discord.js";
import CommandHandler from "./Handler/Commands";
import RunEvent from "./Interfaces/RunEvent"

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

    const prefix = process.env.DISCORD_PREFIX ?? "";
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