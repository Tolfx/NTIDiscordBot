import { stripIndent, stripIndents } from "common-tags";
import { Message, MessageEmbed, Client } from "discord.js";

export const name = "help";

export const cat = "info";

export function run(client: Client, message: Message, args: string[])
{
    const Authors = stripIndent`
    **Authors**
    [Tolfx](https://github.com/Tolfx)
    [Arvid](https://github.com/ArvidAnderson)
    [Herman](https://github.com/themangokid)
    `

    const embed = new MessageEmbed()
    .setColor("#dd0890")
    .setThumbnail(client.user?.avatarURL({ size: 512 }) ?? "")
    .setTimestamp()
    .setAuthor(client.user?.username, client.user?.avatarURL({ size: 512 }) ?? "");
    if(args[0])
    {
        const command = args[0];
        const cmd = client.commands.get(command.toLowerCase());
        let info = "";
        if(!cmd)
        {
            return message.channel.send(embed.setColor("RED").setDescription(stripIndents`
            Unable to find this command..
            `));
        }

        if(cmd?.name) info = `Command name: ${cmd.name} \n`;
        if(cmd?.description) info = `Description: ${cmd.description}\n`;
        if(cmd?.usage) info = `Usage: ${cmd.usage}`;

        return message.channel.send(embed.setDescription(info));
    }
    else
    {
        const commands = (category: string) => {
            return client.commands.filter(e => e.cat === category)
            .map(cmd => ` \`${cmd.name}\``);
        } 
        const category = client.category.map(cat => 
                stripIndents`**${cat[0].toUpperCase() + cat.slice(1)} commands**: \n${commands(cat)}`)
                .reduce((string, category) => string + "\n" + "\n" + category)

        message.channel.send(embed.setDescription(category + "\n\n" + Authors));
    }
}