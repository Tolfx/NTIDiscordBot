//Settings

//Server URL
export const DebugMode = process.env.VUE_APP_DEBUG === "true" ? true : false;
export const webURL = DebugMode ? 'http://localhost:8080/' : "https://discord.ntikronhus.com/";
export const apiURL = DebugMode ? 'http://localhost:5623/' : "https://api.discord.ntikronhus.com/"