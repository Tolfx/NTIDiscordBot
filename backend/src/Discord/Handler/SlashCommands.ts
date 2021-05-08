import { Client, TextChannel } from "discord.js";
import { Discord_Guild_Id, Discord_Token } from "../../Config";
import { DiscordInteractions, Interaction } from "slash-commands";

export default async function SlashCommands(client: Client)
{
    const interaction = new DiscordInteractions({
        applicationId: "835552682030792725",
        authToken: Discord_Token,
        publicKey: "4371ee2c0822bc337ea24ca76a72014a27ad1343c31d3bb0a5e1a5cf38f340ef",
    });

    const Start_Lesson_Command = {
        "name": "start_lesson",
        "description": "Starts a lesson",
        "options": [
            {
                "type": 3,
                "name": "time",
                "description": "How long is the lesson?",
                "default": false,
                "required": true
            }
        ]
    }

    await interaction
        .createApplicationCommand(Start_Lesson_Command, Discord_Guild_Id)
        .catch(console.error);

    // Working on this later.
    //@ts-ignore
    client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
        const command = interaction.data?.name.toLowerCase();
        const args = interaction.data?.options;
        if(command)
        {
            let handler = (client.commands.get(command))?.run_slash;
            //@ts-ignore
            const guild = client.guilds.cache.find(e => e.id === interaction.guild_id);
            //@ts-ignore
            const channel = guild?.channels.cache.get(interaction.channel_id) as TextChannel
            const author = guild?.members.cache.get(interaction.member.user.id);

            // If we found and command execute it.
            if (command) {
                handler?.(
                    client,
                    interaction,
                    //@ts-ignore
                    author,
                    channel,
                    args
                );
            };
        }
    });
}