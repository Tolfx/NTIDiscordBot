import { MessageActionRow, MessageButton, MessageButtonStyles } from "discord-buttons";
import { Message, Client, GuildMember, TextChannel, MessageAdditions } from "discord.js";

interface DataButton
{
    name: string;
    id: string;
    style: "blurple" | "grey" | "green" | "red" | "url"
    // style: keyof MessageButtonStyles;
    disabled?: Boolean;
    emoji?: string;
    url?: string;
}

export default function CreateButton(...data: DataButton[]): any
{
    let buttons = [];
    let rows = new MessageActionRow();

    for(let button of data)
    {
        let b = new MessageButton()
                .setID(button.id)
                .setLabel(button.name)
                //@ts-ignore
                .setStyle(button.style)

        if(button.disabled)
            b.setDisabled(true);

        if(button.emoji)
            b.setEmoji(button.emoji);

        if(button.url && button.style === "url")
            b.setURL(button.url)

        buttons.push(b);
    }
    
    for(let row of buttons)
    {
        rows.addComponent(row)
    }

    return rows;
}