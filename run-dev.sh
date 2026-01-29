#!/bin/bash

# Amman Weather App - Development Runner
# This script helps run both the frontend and backend services

echo "🇯🇴 Amman Weather App - Development Environment"
echo "================================================"
echo ""
echo "This will start both the backend API and frontend app."
echo "Press Ctrl+C to stop all services."
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "Stopping all services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start the .NET backend
echo "🚀 Starting .NET Backend API..."
cd backend/AmmanWeatherApi
dotnet run &
BACKEND_PID=$!
cd ../..

# Wait a moment for the backend to start
sleep 3

# Start the Angular frontend
echo "🚀 Starting Angular Frontend..."
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Services are starting..."
echo ""
echo "📍 Frontend: http://localhost:4200"
echo "📍 Backend API: http://localhost:5137"
echo "📍 Swagger UI: http://localhost:5137/swagger"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait
