import { readdirSync, readFile } from "fs";
import RunEvent from "../../Interfaces/RunEvent";

/**
 * 
 * @description This function sorts and handles our commands so we don't need to manually add them
 * by our own
 */
export default function CommandHandler(client: any): void
{
    // too lazy to explain this code, if you want to know just read.
    const commandDir = process.cwd()+"/Build/Discord/Commands"
    readdirSync(commandDir).forEach((dir) => {
        const command = readdirSync(`${commandDir}/${dir}`).filter((f) => f.endsWith('.js'));
        
        for (let file of command) {
            const pull = require(`${commandDir}/${dir}/${file}`) as { name: string, run: (event: RunEvent)  => any};
            if (pull.name) {
                client.commands.set(pull.name, pull);
                client.category.set(pull.name, dir);
            }
            continue;
        }
    });
}