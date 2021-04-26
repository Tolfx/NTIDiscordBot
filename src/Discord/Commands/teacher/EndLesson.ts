import { Message, MessageEmbed, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import ms from "ms";
import { Student } from "../../../Interfaces/Lessons";
import dateFormat from "date-and-time";
import EventListener from "../../../Lib/EventListener";

export const name = "end_lesson";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(false)
    {
        return;
    }

    let NowLesson = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    if(!NowLesson)
    {
        // Tell author it already has no active lesson....
        return;
    }

    if(NowLesson.ended)
    {
        // Tell author....
        return;
    }

    NowLesson.ended = true;
    NowLesson.save().then(() => {
        EventListener.emit("endedLesson", NowLesson);
        return message.channel.send(`Lesson is over`);
    }).catch(e => {
        return message.channel.send(`Something went wrong while trying to end the lesson, try again later.`);
    })
}