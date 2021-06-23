import { VoiceState } from "discord.js";
import { ILesson } from "../../Interfaces/Lessons";
import EventListener from "../../Lib/EventListener";

//@ts-ignore
let lessons: [ILesson] = [];

EventListener.on("newLesson", (data: ILesson) => {
    lessons.push(data)
});

EventListener.on("endedLesson", (data: ILesson) => {
    const index = lessons.findIndex(lesson => lesson.id === data.id);
    if (index > -1) {
        lessons.splice(index, 1);
    }
});

EventListener.on("updateLesson", (data: ILesson) => {
    const index = lessons.findIndex(lesson => lesson.id === data.id);
    if (index > -1) {
        lessons[index] = data;
    }
});

function getLesson(voiceChannelId: string, lesson: [ILesson])
{
    const index = lesson.findIndex(e => e.mainChannel === voiceChannelId);
    if(index > -1)
    {
        return lessons[index];
    }
    const subIndex = lessons.findIndex(e => e.subChannels.map(e => e === voiceChannelId))
    return lesson[subIndex];
}

function getStudentIndex(lesson: ILesson, userId: string)
{
    const index = lesson.students.findIndex(e => e.memberId === userId);
    return index;
}


export default function VoiceHandler(
    oldState: VoiceState, 
    newState: VoiceState
): void
{
    if(lessons.length <= 0)
        return;
    
    const voiceChannelId = (newState.channel?.id ?? oldState.channel?.id) ?? "";
    const userId = newState.id;
    const lesson = getLesson(voiceChannelId, lessons);

    if(lesson.teacherId === userId)
        return;

    if(lesson.break)
        return;
    
    const student = getStudentIndex(lesson, userId);

    if(student === -1)
        return;

    // Check if user left a voice channel.
    if(newState.channelID === null && oldState.channelID)
    {
        lesson.students[student].hasLeftVoiceChannel = true;
        lesson.students[student].leftVoiceChannel = true;
        lesson.students[student].absence.push({
            leftAt: new Date(),
        });
        lesson.markModified('students');
        lesson.save();
    }

    // Check if rejoined
    if(newState.channelID && oldState.channelID === null)
    {
        lesson.students[student].leftVoiceChannel = false;
        //@ts-ignore
        lesson.students[student].absence.find(e => !e.cameBackAt)?.cameBackAt = new Date();
        lesson.markModified('students');
        lesson.save();
    }

    // Check if camera turned on

    if(newState.selfVideo && !oldState.selfVideo)
    {
        lesson.students[student].hasCameraBeenOn = true;
        lesson.students[student].cameraOn = true;
        lesson.students[student].camereTime.push({
            startedAt: new Date(),
        });
        lesson.markModified('students');
        lesson.save();
    }

    // Check if camera turned off
    if(!newState.selfVideo && oldState.selfVideo)
    {
        lesson.students[student].cameraOn = false;
        //@ts-ignore
        lesson.students[student].camereTime.find(e => !e.endedAt)?.endedAt = new Date();
        lesson.markModified('students');
        lesson.save();
    }

    // Check if stream is on
    if(newState.streaming && !oldState.streaming)
    {
        lesson.students[student].hasBeenStreaming = true;
        lesson.students[student].isStreaming = true;
        lesson.students[student].streamingTime.push({
            startedAt: new Date(),
        });
        lesson.markModified('students');
        lesson.save();
    }

    // Check if stream is off
    if(!newState.streaming && oldState.streaming)
    {
        lesson.students[student].isStreaming = true;
        //@ts-ignore
        lesson.students[student].streamingTime.find(e => !e.endedAt)?.endedAt = new Date();
        lesson.markModified('students');
        lesson.save();
    }

    // Empty return :D
    return;
}