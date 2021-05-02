@echo off

IF NOT EXIST "./vue_frontend" (
    GOTO EXIT
) ELSE (
    GOTO INSTALL_STUFF
)

:EXIT
EXIT 1

:START_BACKEND
timeout /t 30 /nobreak
rem Launch script
cd vue_frontend/dashboard
npm run-script serve

rem If it crashes go back to launch
GOTO START_BACKEND

:INSTALL_STUFF
start cmd /c "install_dependencies.bat vue_frontend"
GOTO START_BACKEND