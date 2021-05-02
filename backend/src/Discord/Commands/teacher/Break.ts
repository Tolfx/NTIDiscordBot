import { Message, MessageEmbed, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import prettyMilliseconds from "pretty-ms";
import ms from "ms";
import dateFormat from "date-and-time";
import { stripIndent } from "common-tags";
import EventListener from "../../../Lib/EventListener";

export const name = "break";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(false)
    {
        return;
    }

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

    if(!NowLesson)
    {
        // Tell author it already has no active lesson....
        return;
    }

    NowLesson.break = true;
    NowLesson.breaks.push({
        startedAt: new Date(),
        endsAt: (dateFormat.addMilliseconds(new Date(), amountOfTime))
    });

    NowLesson.save();

    EventListener.emit("updateLesson", NowLesson);
    message.channel.send(`Break for: ${prettyMilliseconds(amountOfTime)}!`).then(msg => {
        setTimeout(() => {
            if(!NowLesson)
            {
                return;
            }
            NowLesson.break = false;
            NowLesson.save();
            EventListener.emit("updateLesson", NowLesson);
            msg.channel.send(`Break is over!`);
        }, amountOfTime);
    })
}