import { Message, Client, GuildMember, TextChannel } from "discord.js";
import Lesson from "../../../Models/Lesson";
import EventListener from "../../../Lib/EventListener";
import isAdmin from "../../../Lib/DiscordFunc/IsAdmin";
import { Interaction } from "slash-commands";
import { arg_slash } from "../../../Interfaces/RunEvent";
import reply from "../../../Lib/DiscordFunc/SlashReply";

export const name = "end_lesson";

export const cat = "teacher";

export async function run(client: Client, message: Message, args: string[])
{
    // Check if user is a techer (is admin..);
    if(!isAdmin(message))
        return message.channel.send(`You are not an administrator`);

    let NowLesson = await Lesson.findOne({
        teacherId: message.author.id,
        ended: false
    });

    // Tell author it already has no active lesson....
    if(!NowLesson)
        return message.reply(`You have no active lessons!`);

    NowLesson.ended = true;
    NowLesson.save().then(() => {
        EventListener.emit("endedLesson", NowLesson);
        return message.channel.send(`Lesson is over`);
    }).catch(e => {
        return message.channel.send(`Something went wrong while trying to end the lesson, try again later.`);
    });
}

export async function run_slash(
    client: Client,
    interaction: Interaction,
    author: GuildMember,
    channel: TextChannel,
    args: arg_slash
)
{
    const sr = (new reply(client, interaction)).reply;
    // Check if user is a techer (is admin..);
    if(!isAdmin(author))
        return sr(`You are not an administrator`);

    let NowLesson = await Lesson.findOne({
        teacherId: author.id,
        ended: false
    });

    // Tell author it already has no active lesson....
    if(!NowLesson)
        return sr(`You have no active lessons!`);

    NowLesson.ended = true;
    NowLesson.save().then(() => {
        EventListener.emit("endedLesson", NowLesson);
        return sr(`Lesson is over`);
    }).catch(e => {
        return sr(`Something went wrong while trying to end the lesson, try again later.`);
    });
}