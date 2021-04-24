import { Message, MessageEmbed, Client } from "discord.js";
import Lesson from "../../../Models/Lesson";
import ms from "ms";
import { Student } from "../../../Interfaces/Lessons";

export const name = "start_lesson";

export const cat = "lessons";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(false)
    {
        return;
    }

    //@ts-ignore   
    const currentVoiceChannel = message.member.voice.channel;
    if(!currentVoiceChannel)
    {
        return message.channel.send(`Please join a \`voice channel\` to start a lesson`);
    }

    if(!args[0])
    {
        return message.channel.send(`Specify how long this lesson should be.`);
    }

    const amountOfTime = ms(args.join(" "));

    const hasAnLessonActive = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    if(hasAnLessonActive)
    {
        // Tell author it already has an active lesson....
        return;
    }

    // Has no active lessons, lets create one!

    // Gather all students
    const students = currentVoiceChannel.members.filter((member) => member.id !== message.author.id);
    const student: Array<Student> = students.map(e => {
        return {
            memberId: message.id,
            //schoolSoftId?: ;
            voiceChannelId: currentVoiceChannel.id,
            absense: [],
            leftVoiceChannel: false,
            hasLeftVoiceChannel: false,
            messages: [],
            hasSentMessage: false,
            cameraOn: false,
            hasCameraBeenOn: false,
            isStreaming: false,
            hasBeenStreaming: false,
            isOnMobile: e.presence.clientStatus?.mobile ? true : false,
            presence: e.presence,
            pre_registered: false,
        }
    });
    const mainChannel = currentVoiceChannel.id;

    new Lesson({
        teacherId: message.author.id,
        mainChannel,
        endsAt: (new Date().setMilliseconds(amountOfTime)),
        ended: false,
        students: student
    }).save();

    return;
}