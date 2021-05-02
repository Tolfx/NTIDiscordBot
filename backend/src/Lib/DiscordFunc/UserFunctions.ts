import { GuildMember } from "discord.js";
import { VoiceChannel } from "discord.js";
import { Client } from "discord.js";
import { NTIDiscordID } from "../../Config";

export function GetUser(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<GuildMember>
{
    return new Promise((resolve, reject) => {
        try {
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
    
            return resolve(user);
        } catch (e)
        {
            reject(e);
        }
    });
}

export function MuteMember(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<GuildMember>
{
    return new Promise(async (resolve, reject) => {
        try {
            const user = await GetUser(client, memberId, guildId);
    
            if(!user.voice.channel)
            {
                return reject("User is not in a channel");
            }
    
            return resolve(user.voice.setMute(true));
        } catch(e) {
            reject(e);
        }        
    });
}

export function UnMuteMember(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<GuildMember>
{
    return new Promise(async (resolve, reject) => {
        try {
            const user = await GetUser(client, memberId, guildId);
    
            if(!user.voice.channel)
            {
                return reject("User is not in a channel");
            }
    
            return resolve(user.voice.setMute(false));
        } catch(e) {
            reject(e);
        }  
    });
}

export function UserVoiceChat(
    client: Client,
    memberId: string,
    guildId: string = NTIDiscordID
): Promise<VoiceChannel>
{
    return new Promise(async (resolve, reject) => {
        try {
            const user = await GetUser(client, memberId, guildId);
    
            if(!user.voice.channel)
            {
                return reject("User is not in a channel");
            }
    
            return resolve(user.voice.channel);
        } catch(e) {
            reject(e);
        }
    });
}