import { Message, MessageEmbed, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import prettyMilliseconds from "pretty-ms";

export const name = "absence_time";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(false)
    {
        return;
    }

    if(!args[0])
        return message.channel.send(`Please mention a user`);

    const user = message.mentions.users.first()

    if(!user)
        return message.channel.send(`Invalid user`);

    let NowLesson = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    if(!NowLesson)
    {
        // Tell author it already has no active lesson....
        return;
    }



    const studentIndex = NowLesson.students.findIndex(e => e.memberId === user.id);
    const absence = NowLesson.students[studentIndex].absense;
    if(absence.length <= 0)
        return message.channel.send(`User got no absence, amazing!`);

    const totalTime = absence.map(e => {
        //@ts-ignore
        return e.cameBackAt-e.leftAt
    }).reduce((a,c) => a+c);

    message.channel.send(`User has been absence for: ${prettyMilliseconds(totalTime)}`)
}