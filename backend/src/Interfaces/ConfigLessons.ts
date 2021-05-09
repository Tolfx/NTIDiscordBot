import { Document } from "mongoose";

export default interface ConfigLesson extends Document
{
    name: string,
    teacherId: string;
    presence: Presence;
    students: Array<Student>;
    length: number;
    min_camera: number;
    min_streaming: number;
    min_messages: number;
    min_mobile_time: number;
    hall: string;
    logChannel: string;
}

interface Presence 
{
    status: "dnd" | "offline" | "online" | "idle";
    mobile: boolean;
    onWeb: boolean;
    onDesktop: boolean;
}

interface Student
{
    discordId: string;
}