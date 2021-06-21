# NTI's Attendence Discord Bot

This is updated continiously through the development. For the latest notes, scroll the entire way down.


---
## Dependencies
+ https://www.npmjs.com/package/convert-csv-to-json
+ https://www.npmjs.com/package/csvjson-json2csv



## Flowcharts
+ https://github.com/Tolfx/NTIDiscordBot/blob/master/flowchart_narvaro%20(1).svg
+ https://app.diagrams.net/#G1_g1gm0YBLSZB6uz3cCtkHpisn9eu7XHi
+ https://github.com/Tolfx/NTIDiscordBot/blob/master/JWTLogic.svg
## Koder närvaro
+ Schoolsofts koder för närvaron
  - 0 = närvarande
  - 9 = Föranmäld
  - (751 = Deltagit på distans)
  - (205 = Delvis frånvarande)
  - 206 = Sen ankomst
  - 1 = frånvarande 

## Config file for a specific lession
Config for the lession:
+ Start webbutveckling 1 => 70 min
  - First 1 min => setup
  - 25 min stream
  - 5 min camera
  - Chat: 1 message

## Examples
- !rast - låter eleven gå iväg om man inte har genomgång (i max 10 min, går att dela up i !rast 5m !rast 5m)
- !start_lession 1h 20m
- Create an alias for a lession with predefined variables

## Specifics for the timer
- If the student is gone and back under 1 min it does not register
  - Only if repeated more than 4 times

+ Things we want to check for:
  - Camera (Found)
  - Voice (Found)
  - Chat (Found)
  - Stream (Found)



## TDL
+ Skriv om autofillen så du slipper skriva import och save.
DiscordD <---> SSoftID --> CSV Data ---> Fill form

0. Skriv om autofillen så du slipper skriva import och save.
1. Automatisera så man kan få fram ID på eleverna     
2. Generera config filer för automatisk import (Görs igenom att klicka på import / export i pluginen)
3. Sätta upp en server, se till att configen är unik för varje generering. (om det behövs, kan vara bra för de bugg)
4. Se till att man kan importera den till Autofill (Done)

## TDL with @tolfx
5. Make continious updates with a dedicated server

## Images from the chat
Content: https://discord.com/channels/@me/833623467483070526/834878029142163476
![](https://cdn.discordapp.com/attachments/833623467483070526/834883079976779797/unknown.png)
https://pastebin.com/jEithu6S
https://chrome.google.com/webstore/detail/autofill/nlmmgnhgdeffjkdckmikfpnddkbbfkkk

## WHBD
- We drew a flowchart of lession logic
- Research regarding schoolsoft
- Added temp channel to the flowchart
- Gone throu discordjs
- Found out that discordjs supports the project

## WHBD
+ Unminified alla js filer i autofill projektet
+ Import of data through CSV
+ Works to debugg on local server
+ Modded the plugin to show save and import in the front of the plugins main page, for easier management

## WHBD
+ @tolfx implemented config for lessions
+ @tolfx implemented so that a lessions starts
+ @Tolfx added oauth2 on vue frontend
+ @Tolfx fixed jwt auth on API
+ Server url: https://discord.gg/ZqXvgD6d

## TDL
+ Add dependencies for later setup

## How to start bot/server

1. Install TypeScript by running `npm i typescript -g` 
2. Run `npm run-script build` which will build and install node_modules
3. Run app by using `npm run-script start`
4. Check if an `.env` file created and insert the right variables.
5. Start again and success.

## Longterm TDL
 + Clean up dependencies
 + Clean up readme
 + Clean up folders (teacher_frontend)
 + Add automation to regexp script for schoolsoft (kind of important)
 + Remove bloat for the teacher extension eg. 'length', 'status'
 + Add all flowcharts to one flowchart and connect them (if possible, no need to remove the originals)
 
