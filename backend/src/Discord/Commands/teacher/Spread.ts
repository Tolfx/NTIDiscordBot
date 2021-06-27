import { Message, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import { ILesson } from "../../../Interfaces/Lessons"
import { CreateRole } from "../../../Lib/DiscordFunc/ServerFunctions";
import isAdmin from "../../../Lib/DiscordFunc/IsAdmin";
import AW from "../../../Lib/Async";

export const name = "spread";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(!isAdmin(message))
        return message.channel.send(`You are not an administrator`);

    // Something new I'm testing :^)
    const [NowLesson, ErrorLesson] = await AW<ILesson>(Lesson.findOne({
            teacherId: message.author.id,
            ended: false
    }));

    if(ErrorLesson)
        return message.reply(`An error accured`);

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