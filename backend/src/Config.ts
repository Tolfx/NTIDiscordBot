export const ExpressPort = 8080;
export const Discord_Prefix = process.env.PREFIX ?? "!";
export const Discord_Guild_Id = "835552025839665173";
export const Admin_Role_Id = "835552201346121738";
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const callbackURL = process.env.CALLBACK_URL ?? "http://localhost:8080/oauth/callback",
             clientID = process.env.DISCORD_CLIENT_ID ?? "", 
             clientSecret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const SecretAuth = process.env.SECRETAUTH ?? ""
export const NTIDiscordID = "835552025839665173";
export const MongoDB_URL = process.env.MONGODB_URL ?? "";
export const JWT_Access_Token = process.env.ACCESS_TOKEN_SECRET ?? "awgdwkdhwjkdahduihawd";
export const DebugMode = process.env.DEBUG === "true" ? true : false;