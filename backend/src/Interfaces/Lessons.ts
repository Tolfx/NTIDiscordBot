import { Document} from "mongoose"
import { PresenceStatus } from "discord.js"

export interface Lesson extends Document
{
    teacherId: string;
    mainChannel: string;
    subChannels: Array<string>;
    issuedAt: Date;
    endsAt: Date;
    ended: boolean;
    break: boolean;
    breaks: Array<Breaks>;
    students: Array<Student>;
}

export interface Student
{
    memberId: string;
    schoolSoftId?: string;
    voiceChannelId: string;
    absense: Array<Absense>;
    leftVoiceChannel: boolean;
    hasLeftVoiceChannel: boolean;
    messages?: Array<Message>;
    hasSentMessage: boolean;
    cameraOn: boolean;
    hasCameraBeenOn: boolean;
    camereTime: Array<CameraTime>;
    isStreaming: boolean;
    hasBeenStreaming: boolean;
    streamingTime: Array<StreamingTime>;
    isOnMobile: boolean;
    presence: PresenceStatus;
    pre_registered?: boolean;
}

export interface Absense
{
    leftAt: Date;
    cameBackAt?: Date;
}

export interface StreamingTime
{
    startedAt: Date;
    endedAt?: Date;
}

export interface CameraTime
{
    startedAt: Date;
    endedAt?: Date;
}


export interface Message
{
    messageId: string;

}

export interface Breaks
{
    startedAt: Date;
    endsAt: Date;
}