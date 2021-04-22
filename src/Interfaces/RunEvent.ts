import { Client, Message } from "discord.js";

type RunEvent = (
    client: Client,
    message: Message,
    args: string[]
) => void;

export default RunEvent