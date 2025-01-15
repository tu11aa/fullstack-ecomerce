:: this script will start the backend in new terminal and frontend as dev mode
@echo off
:: Use script directory as base path
set "BASE_DIR=%~dp0"

:: Navigate to BE directory and start backend
cd /d "%BASE_DIR%BE"
echo Starting Backend Server...
start cmd /k "echo Backend Server && npm run dev"

:: Navigate to FE directory and start frontend
cd /d "%BASE_DIR%FE"
echo Starting Frontend Server...
npm run dev