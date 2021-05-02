@echo off

IF NOT EXIST "./backend" (
    GOTO EXIT
) ELSE (
    GOTO INSTALL_STUFF
)

:EXIT
EXIT 1

:START_BACKEND
timeout /t 10 /nobreak
rem Launch script
node .\backend\build\Server.js

rem If it crashes go back to launch
GOTO START_BACKEND

:INSTALL_STUFF
start cmd /c "install_dependencies.bat backend"
GOTO START_BACKEND