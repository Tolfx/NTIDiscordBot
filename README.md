# NTI's Attendence Discord Bot

This is updated continiously through the development. For the latest notes, scroll the entire way down.


---

## Flowcharts
+ https://github.com/Tolfx/NTIDiscordBot/blob/master/flowchart_narvaro%20(1).svg
+ https://app.diagrams.net/#G1_g1gm0YBLSZB6uz3cCtkHpisn9eu7XHi


## Questions

- Is it possible to create timers to monitor students?

## Examples

- !start_lession 1h 20m

- Create an alias for a lession with predefined variables


## Problems

- No idea

## Software

- MongoDB

- Typescript


## WHBD

- We drew a flowchart of lession logic
- Research regarding schoolsoft
- Added temp channel to the flowchart
- Gone throu discordjs
- Found out that discordjs supports the project

## Specifics for the timer

- If the student is gone and back under 1 min it does not register
  - Only if repeated more than 4 times
- If RTC-connection is halted for a longer time (say 15 sec)
  - then assume that the student is disconnected

+ Things we want to check for:
  - Camera (Found)
  - Voice (Found)
  - Chat (Found)
  - Stream (Found)

## Koder närvaro
+ Schoolsofts koder för närvaron
  - 0 = närvarande
  - 9 = Föranmäld
  - (751 = Deltagit på distans)
  - (205 = Delvis frånvarande)
  - 206 = Sen ankomst
  - 1 = frånvarande 

## TDL
+ Skriv om autofillen så du slipper skriva import och save.
DiscordD <---> SSoftID --> CSV Data ---> Fill form

0. TDL: Skriv om autofillen så du slipper skriva import och save.
1. Automatisera så man kan få fram ID på eleverna
2. Generera config filer för automatisk import (Görs igenom att klicka på import / export i pluginen)
3. Sätta upp en server, se till att configen är unik för varje generering. (om det behövs, kan vara bra för de bugg)
4. Se till att man kan importera den till Autofill (Done)
## TDL with @tolfx

5. Make continious updates with a dedicated server

## Images from the chat
Content: https://discord.com/channels/@me/833623467483070526/834878029142163476
https://discord.com/channels/@me/833623467483070526/834883080166572063
https://discord.com/channels/@me/833623467483070526/834896386398748752
https://discord.com/channels/@me/833623467483070526/834769643552899113

## What have been done (WHBD)
+ Unminified alla js filer i autofill projektet
+ Import of data through CSV
+ Works to debugg on local server
+ Modded the plugin to show save and import in the front of the plugins main page, for easier management

## WHBD
+ @tolfx implemented config for lessions
+ @tolfx implemented so that a lessions starts
+ Server url: https://discord.gg/ZqXvgD6d

Config for the lession:
+ Start webbutveckling 1 => 70 min
  - First 1 min => setup
  - 25 min stream
  - 5 min camera
  - Chat: 1 message

## TDL
+ Add dependencies for later setup
