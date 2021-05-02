import { Client, Role, VoiceChannel } from "discord.js";
import { NTIDiscordID } from "../../Config";

interface CreateRoleOptions
{
    name: string;
    color?: string;
    permissions?: object;
}

export function CreateRole(
    client: Client,
    options: CreateRoleOptions,
    callback?: (err: Error | null, response: Role | null) => void,
    guildId: string = NTIDiscordID
): Promise<Role>
{
    return new Promise((resolve, reject) => {

        const guild = client.guilds.cache.find(e => e.id === guildId);
        
        if(!guild)
        {
            return callback ? callback(new Error(`No guild found with this id "${guildId}"`), null) 
            : reject(`No guild found with this id "${guildId}"`);
        }

        guild.roles.create({
            data: {
                name: options.name,
                color: options.color
            }
        }).then(r => {
            return callback ? callback(null, r) 
            : resolve(r);
        }).catch(e => {
            return callback ? callback(new Error(`An error accured while trying to create a role`), null) 
            : reject(`An error accured while trying to create a role`);
        });
    })
}

interface CreateVoiceChannelOptions
{
    name: string;
    roleId: string;
    permissions?: object;
}

export function CreateVoiceChannel(
    client: Client,
    options: CreateVoiceChannelOptions,
    callback?: (err: Error | null, response: VoiceChannel | null) => void,
    guildId: string = NTIDiscordID
): Promise<VoiceChannel>
{
    return new Promise((resolve, reject) => {

        const guild = client.guilds.cache.find(e => e.id === guildId);
        
        if(!guild)
        {
            return callback ? callback(new Error(`No guild found with this id "${guildId}"`), null) 
            : reject(`No guild found with this id "${guildId}"`);
        }

        guild.channels.create(options.name, {
            type: "voice",
        }).then(channel => {
            //channel.setParent("");
            channel.overwritePermissions([
                {
                    id: guild.roles.everyone.id,
                    deny: ["VIEW_CHANNEL"],
                },
                {
                    id: options.roleId,
                    allow: ["VIEW_CHANNEL"],
                },
            ]);
            return callback ? callback(null, channel) 
            : resolve(channel);
        }).catch(e => {
            return callback ? callback(new Error(`An error accured while trying to create channel`), null) 
            : reject(`An error accured while trying to create channel`);
        })
    })
}

/*
if(options.asignTo)
{
    const user = guild.members.cache.find(e => e.id === options.asignTo?.userId);
    if(!user)
    {
        return callback ? callback(new Error(`No user found with this id "${options.asignTo?.userId}"`), null) 
        : reject(`No user found with this id "${options.asignTo?.userId}"`);
    }

    user.roles.add(r);

    return callback ? callback(null, r) 
    : resolve(r);
}

if(options.moveTo)
{
    const user = guild.members.cache.find(e => e.id === options.moveTo?.userId);
    if(!user)
    {
        return callback ? callback(new Error(`No user found with this id "${options.moveTo?.userId}"`), null) 
        : reject(`No user found with this id "${options.moveTo?.userId}"`);
    }

    user.voice.setChannel(channel)

    return callback ? callback(null, channel) 
    : resolve(channel);
}
*/