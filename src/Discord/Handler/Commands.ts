import { Client } from "discord.js";
import { readdirSync, readFile } from "fs";
import RunEvent from "../Interfaces/RunEvent";

export default function CommandHandler(commands: any): void
{
    const commandDir = process.cwd()+"/Build/Discord/Commands"
    readdirSync(commandDir).forEach((dir) => {
        const command = readdirSync(`${commandDir}/${dir}`).filter((f) => f.endsWith('.js'));
        
        for (let file of command) {
            const pull = require(`${commandDir}/${dir}/${file}`) as { name: string[], run: (event: RunEvent)  => any};
            if (pull.name) {
                commands.set(pull.name, pull);
            }
            continue;
        }
    });
}