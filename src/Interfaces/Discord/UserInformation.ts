import { Presence, Snowflake } from "discord.js"

export default interface UserInformation
{
    avatar: string | null;
    bot: boolean;
    createdAt: Date;
    createdTimestamp: number;
    defaultAvatarURL: string;
    id: Snowflake;
    presence: Presence;
    tag: string;
    username: string;
}