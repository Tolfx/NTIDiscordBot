import { Client, Message } from "discord.js";

type RunEvent = (
    client: Client,
    message: Message,
    args: string[]
) => void;

interface Command
{
    name: string;
    cat: string;
    run: RunEvent;
}

export default Command