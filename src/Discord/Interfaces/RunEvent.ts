import {Client, Message} from "discord.js";

export default interface RunEvent
{
    message: Message,
    client: Client,
    args: string[],
}