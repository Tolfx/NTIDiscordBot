import RunEvent from "../../../Interfaces/RunEvent";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed, Client } from "discord.js";

export const name = "help";

export function run(client: Client, message: Message, args: string[])
{
    const Embed = new MessageEmbed()
    .setDescription(stripIndents`
    This is a help command :\)
    `)

    message.channel.send(Embed);
}