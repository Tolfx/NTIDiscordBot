import { Message, MessageEmbed, Client } from "discord.js";

export const name = "ping";

export function run(client: Client, message: Message, args: string[])
{
    message.channel.send(`Ping: ${client.ws.ping}`);
}