import RunEvent from "../../../Interfaces/RunEvent";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed, Client } from "discord.js";

export const name = "help";

export const cat = "info";

export function run(client: Client, message: Message, args: string[])
{
    const commands = (category: string) => {
        return client.commands.filter(e => e.cat === category)
        .map(cmd => ` \`${cmd.name}\``);
    } 
    const category = client.category.map(cat => 
            stripIndents`**${cat[0].toUpperCase() + cat.slice(1)} commands**: \n${commands(cat)}`)
            .reduce((string, category) => string + "\n" + "\n" + category)

    console.log(category);

    const Embed = new MessageEmbed();

    message.channel.send(Embed.setDescription(category));
}