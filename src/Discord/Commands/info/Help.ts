import RunEvent from "../../../Interfaces/RunEvent";

export const name = ["ping"];

export function run(_self: RunEvent) {
    _self.message.reply(`Pong! Current ping is ${_self.client.ws.ping}`);
}