@echo off
set arg1=%1

IF "%arg1%"=="backend" (
    cd ./backend
    npm install && npm i typescript -g && tsc
)