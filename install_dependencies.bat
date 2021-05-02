@echo off
set arg1=%1

IF "%arg1%"=="backend" (
    cd ./backend
    npm install && npm i typescript -g && tsc
)

IF "%arg1%"=="vue_frontend" (
    cd ./backend
    npm install
)