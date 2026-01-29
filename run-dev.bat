@echo off
REM Amman Weather App - Development Runner (Windows)
REM This script helps run both the frontend and backend services

echo 🇯🇴 Amman Weather App - Development Environment
echo ================================================
echo.
echo Starting backend and frontend services...
echo.

REM Start the .NET backend in a new window
echo 🚀 Starting .NET Backend API...
start "Amman Weather API" cmd /k "dotnet run"

REM Wait a moment for the backend to start
timeout /t 3 /nobreak >nul

REM Start the Angular frontend in a new window
echo 🚀 Starting Angular Frontend...
start "Amman Weather Frontend" cmd /k "npm start"

echo.
echo ✅ Services are starting in separate windows...
echo.
echo 📍 Frontend: http://localhost:4200
echo 📍 Backend API: http://localhost:5137
echo 📍 Swagger UI: http://localhost:5137/swagger
echo.
echo Close the terminal windows to stop the services.
echo.
pause
