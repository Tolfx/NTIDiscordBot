import { Client, TextChannel } from "discord.js";
import { Discord_Guild_Id, Discord_Id, Discord_Public_Key, Discord_Token } from "../../Config";
import { DiscordInteractions, Interaction } from "slash-commands";
import { GuildMember } from "discord.js";
import SlashCommandsArray from "../../Lib/DiscordFunc/SlashCommands";
import AW from "../../Lib/Async";
import log from "../../Lib/Logger";
import { MessageComponent } from "discord-buttons";

export default async function SlashCommands(client: Client)
{
    const interaction = new DiscordInteractions({
        applicationId: Discord_Id,
        authToken: Discord_Token,
        publicKey: Discord_Public_Key,
    });

    for (let i = 0; i < SlashCommandsArray.length; i++)
    {
        const [Data, C_Error] = await AW(interaction.createApplicationCommand(SlashCommandsArray[i], Discord_Guild_Id))
        if(C_Error)
            log.error(`${C_Error}`)
    }

    // Working on this later.
    //@ts-ignore
    client.ws.on('INTERACTION_CREATE', async (interaction: Interaction | MessageComponent) => {
        if(interaction instanceof MessageComponent)
            return;
        const command = interaction.data?.name.toLowerCase();
        const args = interaction.data?.options;
        if(command)
        {
            let handler = (client.commands.get(command))?.run_slash;
            //@ts-ignore
            const guild = client.guilds.cache.find(e => e.id === interaction.guild_id);
            //@ts-ignore
            const channel = guild?.channels.cache.get(interaction.channel_id) as TextChannel
            const author = guild?.members.cache.get(interaction.member.user.id) as GuildMember;

            // If we found and command execute it.
            if (command) {
                handler?.(
                    client,
                    interaction,
                    author,
                    channel,
                    args
                );
            };
        }
    });
}