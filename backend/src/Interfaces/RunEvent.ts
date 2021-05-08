import { TextChannel } from "discord.js";
import { Client, Message, GuildMember } from "discord.js";
import { ApplicationCommandInteractionDataOption, Interaction } from "slash-commands";

export type arg_slash = ApplicationCommandInteractionDataOption[] | undefined;

export type RunEvent = (
    client: Client,
    message: Message,
    args: string[] | ApplicationCommandInteractionDataOption[] | undefined
) => void;

export type RunEventSlash = (
    client: Client,
    interaction: Interaction,
    author: GuildMember,
    channel: TextChannel,
    args: arg_slash
) => void;