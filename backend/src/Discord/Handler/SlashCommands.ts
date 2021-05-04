import { Client, MessageEmbed, APIMessage } from "discord.js";
import { Discord_Guild_Id, Discord_Token } from "../../Config";
import { DiscordInteractions, Interaction } from "slash-commands";

export default async function SlashCommands(client: Client)
{
    const createAPIMessage = async (interaction: Interaction, content: any) => {
        const { data, files } = await APIMessage.create(
            //@ts-ignore
            client?.channels?.resolve(interaction?.channel_id),
        content
        )
            .resolveData()
            .resolveFiles()
    
        return { ...data, files }
    }

    const reply = async (interaction: Interaction, response: any) => {
        let data = {
            content: response,
        }

        if (typeof response === 'object') {
            //@ts-ignore
            data = await createAPIMessage(interaction, response)
        }

        //@ts-ignore
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
            type: 4,
            data,
            },
        })
    }

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


    //@ts-ignore
    client.ws.on('INTERACTION_CREATE', async (interaction: Interaction) => {
        const command = interaction.data?.name.toLowerCase();
        const args = interaction.data?.options;
        
        if(command === "start_lesson")
        {
            const embed = new MessageEmbed()
            .setDescription("Hello :D")
            reply(interaction, embed)
        }
    });
}