import { VoiceState } from "discord.js";
import { Lesson } from "../../Interfaces/Lessons";
import EventListener from "../../Lib/EventListener";

//@ts-ignore
let lessons: [Lesson] = [];

EventListener.on("newLesson", (data: Lesson) => {
    lessons.push(data)
});

EventListener.on("endedLesson", (data: Lesson) => {
    const index = lessons.findIndex(lesson => lesson._id === data._id);
    if (index > -1) {
        lessons.splice(index, 1);
    }
});

export default function VoiceHandler(
    oldState: VoiceState, 
    newState: VoiceState
)
{
    
}