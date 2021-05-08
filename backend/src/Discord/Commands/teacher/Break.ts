import { Message, MessageEmbed, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import prettyMilliseconds from "pretty-ms";
import ms from "ms";
import dateFormat from "date-and-time";
import { stripIndent } from "common-tags";
import EventListener from "../../../Lib/EventListener";
import isAdmin from "../../../Lib/DiscordFunc/IsAdmin";

export const name = "break";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(!isAdmin(message))
        return message.channel.send(`You are not an administrator`);

    if(!args[0])
        return message.channel.send(`Please add how long the break shall be.`);

    const amountOfTime: number = args.map(e => {
        return ms(e)
    }).reduce((a, c) => a+c);

    let NowLesson = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false,
        break: false
    });

    // Tell author it already has no active lesson....
    if(!NowLesson)
        return message.reply(`You have no active lessons!`);

    NowLesson.break = true;
    NowLesson.breaks.push({
        startedAt: new Date(),
        endsAt: (dateFormat.addMilliseconds(new Date(), amountOfTime))
    });

    NowLesson.save();

    EventListener.emit("updateLesson", NowLesson);
    message.channel.send(`Break for: ${prettyMilliseconds(amountOfTime)}!`).then(msg => {
        setTimeout(async () => {
            if(!NowLesson)
            {
                return;
            }
            NowLesson.break = false;
            await NowLesson.save();
            EventListener.emit("updateLesson", NowLesson);
            msg.channel.send(`Break is over!`);

            // Check if any students joined back / or even left?
            const students = NowLesson.students;
            students.forEach(async (student, index) => {
                const studentId = student.memberId;
                //@ts-ignore
                const user = message.guild.members.cache.find(i => i.id === studentId);
                if(!user)
                    return;
                
                if(!user.voice.channelID)
                {
                    NowLesson?.students[index].absence.push({
                        leftAt: new Date()
                    });
                    NowLesson?.markModified('students');
                    await NowLesson?.save();
                }
            });
        }, amountOfTime);
    })
}