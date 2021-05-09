import { Message, GuildMember } from "discord.js";
import { Admin_Role_Id } from "../../Config";

const isAdmin = (content: Message | GuildMember) => 
{
    if(content instanceof Message)
        //@ts-ignore
        return (content.member.roles.cache.find(e => e.id === Admin_Role_Id)) ? true : false;
    if(content instanceof GuildMember)
        return (content.roles.cache.find(e => e.id === Admin_Role_Id)) ? true : false;
}

export default isAdmin;