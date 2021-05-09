import { Client, Collection, Message } from "discord.js";
import CommandHandler from "./Handler/Commands";
import RunEvent from "../Interfaces/Command"
import { Discord_Prefix, Discord_Token } from "../Config";
import log from "../Lib/Logger";
import ExpressServer from "../Express/Main";
import { Guild } from "discord.js";
import VoiceHandler from "./Handler/VoiceHandler";
import reCache from "./Handler/Caching";
import SlashCommands from "./Handler/SlashCommands";
const prefix = Discord_Prefix;

declare module 'discord.js' 
{
    export interface Client {
      commands: Collection<string, RunEvent>;
      category: string[];
    }

}

/*

Guide: How to create a new command.
    Every command goes to "Commands" folder,
    There you have different categories which can also be created,
    by creating a new folder with a new name.

    Then when you want to create a new command you create a new file,
    in a category, then you must export two very important stuff.

    1. You need to export "name" which is a string which will identify
        the command name when executed.
    2. You need to export a function called "run" which takes in type EventRun,
        which contains arguments that you'll need to subtain the command.
        For example "function run(client: Client, message: Message, args: string[]) {...}
    
    Once all you've done this correctly it should work once the bot is started :D

*/

const client = new Client();

export default function StartDiscordBot()
{

    client.commands = new Collection();

    /**
     * @description Start express server with client.
     */
    new ExpressServer(client);

    // Our command handlar sorts and finds commands and maps it so we can execute it later.
    CommandHandler(client);

    // When our client is ready say it!
    client.once("ready", () => {
        log.info(`Bot is ready and online!`, log.trace());
        client.user?.setPresence({
            status: "dnd",
            activity: {
                name: `${prefix}help`,
                type: "LISTENING",
            }
        })
    });


    client.on("message", (message: Message) => {
        //If the bot is sending it self a message
        if (message.author.bot) return;
        //If the message wasn't from the guild (aka dm) return
        if (!message.guild) return;
        //If the messages doesnt start with prefix ignore it
        if (!message.content.startsWith(prefix)) return;

        //The arguments /shrug
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        //Find what command the user is doing
        const cmd: any = args.shift()?.toLowerCase();

        if (cmd.length === 0) return;
        
        // Find the command.
        let command = (client.commands.get(cmd))?.run;

        // If we found and command execute it.
        if (command) {
            command(
                client,
                message,
                args
            );
        };
    });

    client.on("voiceStateUpdate", (oldState, newState) => {
        VoiceHandler(oldState, newState);
    });

    client.on("guildCreate", (guild: Guild) => {
        // Only our guild allowed...
        if(guild.id !== "589051744030294017")
        {
            guild.leave();
        };
    });

    reCache();
    SlashCommands(client);

    client.login(Discord_Token);
};