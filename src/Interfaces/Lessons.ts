import { Document} from "mongoose"
import { Presence } from "discord.js"
import { PresenceStatus } from "discord.js"

export interface Lesson extends Document
{
    teacherId: string;
    mainChannel: string;
    issuedAt: Date;
    endsAt: Date;
    ended: boolean;
    students: Array<Student>;
}

export interface Student
{
    memberId: string;
    schoolSoftId?: string;
    voiceChannelId: string;
    absense: Array<Absense>;
    leftVoiceChannel: boolean;
    hasLeftVoiceChannel?: boolean;
    messages?: Array<Message>;
    hasSentMessage: boolean;
    cameraOn: boolean;
    hasCameraBeenOn: boolean;
    isStreaming: boolean;
    hasBeenStreaming: boolean;
    isOnMobile: boolean;
    presence: PresenceStatus;
    pre_registered?: boolean;
}

export interface Absense
{
    leftAt: Date;
    cameBackAt: Date;
}

export interface Message
{
    messageId: string;

}