import { GuildMember } from "discord.js";
import { Client } from "discord.js";
import { NTIDiscordID } from "../../Config";

export function MuteMember(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<GuildMember>
{
    return new Promise((resolve, reject) => {
        const guild = client.guilds.cache.find(e => e.id === guildId);

        if(!guild)
        {
            return reject(`No guild found with this id "${guildId}"`);
        }

        const user = guild.members.cache.find(e => e.id === memberId);

        if(!user)
        {
            return reject(`No member found in this guild with id "${memberId}"`);
        }

        return resolve(user.voice.setMute(true));
    });
}

export function UnMuteMember(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<GuildMember>
{
    return new Promise((resolve, reject) => {
        const guild = client.guilds.cache.find(e => e.id === guildId);

        if(!guild)
        {
            return reject(`No guild found with this id "${guildId}"`);
        }

        const user = guild.members.cache.find(e => e.id === memberId);

        if(!user)
        {
            return reject(`No member found in this guild with id "${memberId}"`);
        }

        return resolve(user.voice.setMute(false));
    });
}