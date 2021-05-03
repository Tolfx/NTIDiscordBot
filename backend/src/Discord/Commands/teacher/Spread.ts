import { Message, MessageEmbed, Client, Role } from "discord.js";
import Lesson from "../../../Models/Lesson";
import { CreateRole, CreateVoiceChannel } from "../../../Lib/DiscordFunc/ServerFunctions";

export const name = "spread";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    //@ts-ignore
    const isAdmin = (message?.member.roles.cache.find(e => e.id === Admin_Role_Id)) ? true : false;
    // Check if user is a techer (is admin..);
    if(!isAdmin)
    {
        return message.channel.send(`You are not an administrator`);
    }

    let NowLesson = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    // Tell author it already has no active lesson....
    if(!NowLesson)
        return message.reply(`You have no active lessons!`);

    const students = NowLesson.students;
    if(students.length <= 0)
        return message.channel.send(`You have no students to spread..`);

    const amountOfGroups = parseInt(args[0])
    if(!args[0])
        return message.channel.send(`Please specify amount of groups you want.`);

    let groupNames: Array<string> = [];
    let name = `${message.author.username} Grupprum`;
    for(let i = 0; i < amountOfGroups; i++)
    {
        groupNames.push(`${name} ${i+1}`);
    }

    const roles = groupNames.map(async name => {
        const role = await CreateRole(client, {
            name,
        });
        return role;
    });
    return;
}