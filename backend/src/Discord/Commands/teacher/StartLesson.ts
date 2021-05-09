import { Message, Client, GuildMember, TextChannel } from "discord.js";
import Lesson from "../../../Models/Lesson";
import ms from "ms";
import { Student } from "../../../Interfaces/Lessons";
import dateFormat from "date-and-time";
import EventListener from "../../../Lib/EventListener";
import StudentSchema from "../../../Models/Student";
import log from "../../../Lib/Logger";
import { arg_slash } from "../../../Interfaces/RunEvent";
import { Interaction } from "slash-commands";
import isAdmin from "../../../Lib/DiscordFunc/IsAdmin";
import reply from "../../../Lib/DiscordFunc/SlashReply";

export const name = "start_lesson";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(!isAdmin(message))
        return message.channel.send(`You are not an administrator`);

    //@ts-ignore   
    const currentVoiceChannel = message.member.voice.channel;
    if(!currentVoiceChannel)
        return message.channel.send(`Please join a \`voice channel\` to start a lesson`);

    if(!args[0])
        return message.channel.send(`Specify how long this lesson should be.`);

    const amountOfTime: number = args.map(e => {
        return ms(e)
    }).reduce((a, c) => a+c);

    const hasAnLessonActive = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    // Tell author it already has an active lesson....
    if(hasAnLessonActive)
        return message.reply(`You already have an active lesson!`);

    // Has no active lessons, lets create one!

    // Gather all students
    const students = currentVoiceChannel.members.filter((member) => member.id !== message.author.id);
    const student: Array<Student> = students.map(e => {
        
        StudentSchema.findOne({ discordId: e.id }).then(s => {
            if(!s)
            {
                new StudentSchema({
                    discordId: e.id,
                    schoolSoftId: "",
                    fullname: e.nickname ?? "",
                }).save();
            }
        }).catch(() => {
            log.error(`Failed to create new user in database.`, log.trace());
        });

        return {
            memberId: e.id,
            //schoolSoftId?: ;
            voiceChannelId: currentVoiceChannel.id,
            absence: [],
            leftVoiceChannel: false,
            hasLeftVoiceChannel: false,
            messages: [],
            hasSentMessage: false,
            cameraOn: false,
            hasCameraBeenOn: false,
            camereTime: [],
            isStreaming: false,
            hasBeenStreaming: false,
            streamingTime: [],
            isOnMobile: e.presence.clientStatus?.mobile ? true : false,
            presence: e.presence.status,
            pre_registered: false,
        }
    });

    const mainChannel = currentVoiceChannel.id;

    const date = new Date();
    const lessonEnds = (dateFormat.addMilliseconds(date, amountOfTime));
    
    new Lesson({
        teacherId: message.author.id,
        mainChannel,
        endsAt: lessonEnds,
        ended: false,
        break: false,
        breaks: [],
        students: student
    }).save().then(e => EventListener.emit("newLesson", e));
    
    return message.channel.send(`Lesson started and ends at: \`${dateFormat.format(lessonEnds, "HH:mm:ss")}\`.`);
}

export async function run_slash(
    client: Client,
    interaction: Interaction,
    author: GuildMember,
    channel: TextChannel,
    args: arg_slash
)
{
    const sr = new reply(client, interaction);
    // Check if user is a techer (is admin..);
    if(!isAdmin(author))
        return sr.reply(`You are not an administrator`);
  
    const currentVoiceChannel = author.voice.channel;
    if(!currentVoiceChannel)
        return sr.reply(`Please join a \`voice channel\` to start a lesson`);

    //@ts-ignore
    const time = (args?.find(e => e.name === "time"))?.value;

    const amountOfTime: number = ms(time as string);

    const hasAnLessonActive = await Lesson.findOne({
        teacherId: author.id,
        ended: false
    });

    // Tell author it already has an active lesson....
    if(hasAnLessonActive)
        return sr.reply(`You already have an active lesson!`);

    // Gather all students
    const students = currentVoiceChannel.members.filter((member) => member.id !== author.id);
    const student: Array<Student> = students.map(e => {
        
        StudentSchema.findOne({ discordId: e.id }).then(s => {
            if(!s)
            {
                new StudentSchema({
                    discordId: e.id,
                    schoolSoftId: "",
                    fullname: e.nickname ?? "",
                }).save();
            }
        }).catch(() => {
            log.error(`Failed to create new user in database.`, log.trace());
        });

        return {
            memberId: e.id,
            //schoolSoftId?: ;
            voiceChannelId: currentVoiceChannel.id,
            absence: [],
            leftVoiceChannel: false,
            hasLeftVoiceChannel: false,
            messages: [],
            hasSentMessage: false,
            cameraOn: false,
            hasCameraBeenOn: false,
            camereTime: [],
            isStreaming: false,
            hasBeenStreaming: false,
            streamingTime: [],
            isOnMobile: e.presence.clientStatus?.mobile ? true : false,
            presence: e.presence.status,
            pre_registered: false,
        }
    });

    const mainChannel = currentVoiceChannel.id;

    const date = new Date();
    const lessonEnds = (dateFormat.addMilliseconds(date, amountOfTime));
    
    new Lesson({
        teacherId: author.id,
        mainChannel,
        endsAt: lessonEnds,
        ended: false,
        break: false,
        breaks: [],
        students: student
    }).save().then(e => EventListener.emit("newLesson", e));
    
    return sr.reply(`Lesson started and ends at: \`${dateFormat.format(lessonEnds, "HH:mm:ss")}\`.`);
}