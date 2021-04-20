# NTIDiscordBot

# Discord planing

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

- Things we want to check for:

  - Camera

  - Voice

  - Chat

  - Stream
