# Weather Application

A simple weather application built using the Najiz.MicroTemplate framework.

## Technology Stack

- **Backend**: ASP.NET Core 3.1
- **Frontend**: Vue.js 2.6 + TypeScript 4.5 + Vuetify 1.5
- **Build**: MSBuild + Vue CLI 3.10 + npm/Webpack

## Project Structure

```
WeatherApp/
├── ClientApp/              # Frontend Vue.js application
│   ├── components/         # Vue components
│   │   ├── App/           # Main app component
│   │   ├── Index/         # Home page component
│   │   └── Weather/       # Weather display component
│   ├── Services/          # Frontend services
│   │   ├── AxiosService.ts
│   │   ├── LoaderService.ts
│   │   ├── TelemetryService.ts
│   │   └── WeatherService.ts
│   ├── plugins/           # Vue plugins
│   ├── shared/            # Shared utilities
│   └── modules/           # TypeScript modules
├── Config/                # Configuration files
├── Controller/            # API controllers (empty)
├── Models/               # Data models (empty)
├── Pages/                # Razor pages
└── public/               # Static assets

```

## Features

- View current weather for major Saudi cities (Riyadh, Jeddah, Dammam, Mecca, Medina)
- Display temperature, humidity, and wind speed
- Modern, responsive UI using Vuetify
- City selection dropdown
- Refresh button to update weather data

## Setup Instructions

### Prerequisites

- .NET Core 3.1 SDK
- Node.js (v12 or higher)
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd WeatherApp
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Restore .NET packages:
   ```bash
   dotnet restore
   ```

### Development

To run the application in development mode:

```bash
# Build frontend
npm run build

# Run backend
dotnet run
```

Access the application at: `http://localhost:5000/applications/weatherapp/`

### Building for Production

```bash
# Build frontend
npm run build

# Build backend
dotnet build -c Release

# Publish
dotnet publish -c Release
```

## API Integration

The weather service currently uses mock data for demonstration. To integrate with a real weather API:

1. Obtain an API key from a weather service provider (e.g., OpenWeatherMap)
2. Update the `WeatherService.ts` file to use the real API
3. Configure the API key in `appsettings.json`

## Configuration

- **Port**: 5000 (configurable in `Properties/launchSettings.json`)
- **Base URL**: `/applications/weatherapp` (configurable in `vue.config.js`)
- **Application Insights**: Configure in `appsettings.json` and `public/config.json`

## Template Files Included

This project includes all standard Najiz.MicroTemplate files:

- ✅ All configuration files (.npmrc, package.json, tsconfig.json, etc.)
- ✅ Backend files (Program.cs, Startup.cs, .csproj)
- ✅ Frontend core files (main.ts, router.ts, plugins)
- ✅ Services (AxiosService, LoaderService, TelemetryService)
- ✅ Shared utilities (UserService, UserModel)
- ✅ Base components (App, Index)
- ✅ Public files (index.html, manifest.json, config.json)
- ✅ Razor pages (Error pages)

## Weather Features Added

In addition to the template structure, this project adds:

- ✅ Weather component (`ClientApp/components/Weather/`)
- ✅ WeatherService for data fetching
- ✅ Weather route in router
- ✅ Updated Index page to display weather

## License

This project uses the Najiz.MicroTemplate framework.
