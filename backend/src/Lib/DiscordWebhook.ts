import { MessageEmbed, WebhookClient } from "discord.js";
import { DW_Colors, DW_WebHooks } from "../Types/DiscordWebhook";



function getToken(url: string) 
{
    let removeURL = url.replace('https://discord.com/api/webhooks/', '');
    let parser = removeURL.split(/\//g);
    let token = parser[1];
  
    return token;
}
  
function getID(url: string) 
{
    let removeURL = url.replace('https://discord.com/api/webhooks/', '');
    let parser = removeURL.split(/\//g);
    let ID = parser[0];
  
    return ID;
}

function getWebhookURL(webhook: DW_WebHooks)
{
    if(webhook === "General")
        return process.env.DISCORD_WEBHOOK_GENERAL ?? "";

    if(webhook === "Logs")
        return process.env.DISCORD_WEBHOOK_LOGS ?? "";

    return process.env.DISCORD_WEBHOOK_GENERAL ?? "";
}

function getColor(color: DW_Colors)
{
    if(color === "Green")
        return "#94E27A";

    if(color === "Red")
        return "#E27A7A";

    if(color === "Yellow")
        return "#E0E27A";

    return "#94E27A";
}

function DiscordWebhook(info: any, color: DW_Colors, webhook: DW_WebHooks) 
{
    const webhookURL = getWebhookURL(webhook);
    let ID = getID(webhookURL);
    let Token = getToken(webhookURL);
    const webhookClient = new WebhookClient(ID, Token);
    const embed = new MessageEmbed().setColor(getColor(color)).setDescription(info);
    return webhookClient.send(``, {
        username: '',
        embeds: [embed],
    });
}

export default DiscordWebhook;