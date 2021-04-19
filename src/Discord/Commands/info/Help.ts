import RunEvent from "../../Interfaces/RunEvent";

export const name = ["ping"];

export function run(e: RunEvent) {
    e.message.reply(`Pong! Current ping is ${e.client.ws.ping}`);
}