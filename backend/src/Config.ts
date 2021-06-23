export const DebugMode = process.env.DEBUG === "true" ? true : false;
export const ExpressPort = 8080;
export const Admin_Role_Id = DebugMode ? "835552201346121738" : "";
export const Discord_Prefix = process.env.PREFIX ?? "!";
export const Discord_Guild_Id = DebugMode ? "835552025839665173" : "";
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const Discord_Id = DebugMode ? "835552682030792725" : "856873825283342350";
export const Discord_Public_Key = DebugMode ? 
            "4371ee2c0822bc337ea24ca76a72014a27ad1343c31d3bb0a5e1a5cf38f340ef" : 
            "b9dcee4a05ceeec841f76c4dbfd8e514302877dbc8580762c0333e11e79c2e12";
export const callbackURL = process.env.CALLBACK_URL ?? "http://localhost:8080/oauth/callback",
             clientID = process.env.DISCORD_CLIENT_ID ?? "", 
             clientSecret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const SecretAuth = process.env.SECRETAUTH ?? ""
export const NTIDiscordID = "835552025839665173";
export const MongoDB_URL = process.env.MONGODB_URL ?? "";
export const JWT_Access_Token = process.env.ACCESS_TOKEN_SECRET ?? "awgdwkdhwjkdahduihawd";