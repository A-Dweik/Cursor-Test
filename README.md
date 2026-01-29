# 🇯🇴 Amman Weather App

A full-stack weather application for Amman, Jordan featuring an Angular 21 frontend and .NET 8.0 Web API backend. The app displays real-time weather conditions including temperature, wind speed, humidity, pressure, and weather descriptions.

## ✨ Features

### Frontend (Angular)
- 🌡️ Real-time temperature display in Celsius
- 💨 Wind speed with directional indicator (N, S, E, W, etc.)
- 🌡️ Feels-like temperature
- 💧 Humidity percentage
- 🔽 Atmospheric pressure
- 🌤️ Weather condition icons and descriptions
- 🔄 Refresh button to get latest weather data
- ⚡ Fast and responsive UI
- 📱 Mobile-friendly design
- ⏱️ Last updated timestamp

### Backend (.NET)
- 🔌 RESTful API with multiple endpoints
- 🌐 Fetches data from Open-Meteo API
- 📊 Structured logging
- 🔒 CORS configured for Angular app
- 📖 Swagger/OpenAPI documentation
- 🏥 Health check endpoint
- 🆓 No API key required

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or later) and npm
- **.NET 8.0 SDK** or later

### Installation

1. **Install Frontend Dependencies**:

```bash
npm install
```

2. **Install Backend Dependencies** (automatically restored):

```bash
cd backend/AmmanWeatherApi
dotnet restore
cd ../..
```

### Running the Application

**Important**: You need to run both the backend API and frontend app simultaneously.

#### Option 1: Quick Start (Recommended)

Use the provided development scripts:

**Linux/Mac**:
```bash
./run-dev.sh
```

**Windows**:
```bash
run-dev.bat
```

These scripts will automatically start both services for you.

#### Option 2: Manual Start (Separate Terminals)

**Terminal 1 - Start the .NET Backend**:
```bash
cd backend/AmmanWeatherApi
dotnet run
```
The API will start on `http://localhost:5137`

**Terminal 2 - Start the Angular Frontend**:
```bash
npm start
# or
ng serve
```
The app will be available at `http://localhost:4200`

#### Option 3: Using Watch Mode (Hot Reload)

**Backend with hot reload**:
```bash
cd backend/AmmanWeatherApi
dotnet watch run
```

**Frontend (already has hot reload)**:
```bash
npm start
```

### Accessing the Application

- **Frontend**: `http://localhost:4200` - Main weather app
- **Backend API**: `http://localhost:5137/api/weather/amman` - Weather data endpoint
- **Swagger UI**: `http://localhost:5137/swagger` - API documentation

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## 🏗️ Building

To build the project for production, run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build is optimized for performance and speed.

## 🛠️ Tech Stack

### Frontend
- **Angular 21** - Modern web framework with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming with Observables
- **Angular Signals** - Reactive state management
- **CSS3** - Modern styling with gradients and animations

### Backend
- **ASP.NET Core 8.0** - Web API framework
- **.NET 8.0** - Runtime platform
- **HttpClient** - HTTP client for external API calls
- **Swashbuckle** - Swagger/OpenAPI documentation
- **System.Text.Json** - JSON serialization

### External Services
- **Open-Meteo API** - Free weather data API (no API key required)

## 🏗️ Project Structure

```
amman-weather/
├── src/                          # Angular frontend
│   ├── app/
│   │   ├── app.ts               # Main component
│   │   ├── app.html             # Component template
│   │   ├── app.css              # Component styles
│   │   └── weather.service.ts   # Weather API service
│   ├── index.html               # Main HTML file
│   └── main.ts                  # Application entry point
│
├── backend/                      # .NET backend
│   └── AmmanWeatherApi/
│       ├── Controllers/         # API controllers
│       ├── Services/            # Business logic
│       ├── Models/              # Data models
│       └── Program.cs           # API entry point
│
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 📍 Location

The app is configured to display weather for:
- **City**: Amman, Jordan
- **Coordinates**: 31.9454°N, 35.9284°E

## 🔌 API Endpoints

The backend provides the following endpoints:

- `GET /api/weather/amman` - Get current weather data
- `GET /api/weather/description/{code}` - Get weather description
- `GET /api/weather/icon/{code}` - Get weather icon
- `GET /api/weather/wind-direction/{degrees}` - Get wind direction
- `GET /api/weather/health` - Health check

See `backend/AmmanWeatherApi/README.md` for detailed API documentation.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 🎨 Design Features

- Modern gradient background
- Clean card-based layout
- Smooth animations and transitions
- Loading spinner for data fetching
- Error handling with retry functionality
- Responsive design for all screen sizes

## 🧪 Testing the API

You can test the backend API independently:

```bash
# Health check
curl http://localhost:5137/api/weather/health

# Get weather data
curl http://localhost:5137/api/weather/amman

# Get weather description
curl http://localhost:5137/api/weather/description/2
```

## 📝 API Information

The backend fetches data from the [Open-Meteo API](https://open-meteo.com/), a free weather API that doesn't require an API key. It provides accurate weather data for locations worldwide.

## 🔧 Configuration

### Frontend Configuration

The Angular app is configured to call the backend API at `http://localhost:5137`. To change this, update the `API_URL` in `src/app/weather.service.ts`:

```typescript
private readonly API_URL = 'http://localhost:5137/api/weather';
```

### Backend Configuration

CORS is configured to allow requests from `http://localhost:4200`. To modify this or add production URLs, edit `backend/AmmanWeatherApi/Program.cs`:

```csharp
policy.WithOrigins("http://localhost:4200", "https://your-production-domain.com")
```

## 📄 License

This project is open source and available for educational purposes.

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
