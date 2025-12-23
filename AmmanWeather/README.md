# Amman Weather Application

A modern weather application built with ASP.NET Core 3.1 and Vue.js 2.6 that displays real-time weather information for Amman, Jordan.

## Features

- 🌤️ Real-time weather data for Amman
- 📅 5-day weather forecast
- 🎨 Beautiful, responsive UI with Vuetify
- 🔄 Auto-updating time and date
- 📱 Mobile-friendly design
- 🌈 Gradient background with modern styling

## Technology Stack

### Backend
- **ASP.NET Core 3.1** - Web framework
- **Najiz Framework** - Enterprise framework components
- **C# .NET** - Programming language

### Frontend
- **Vue.js 2.6** - Progressive JavaScript framework
- **TypeScript 4.5** - Type-safe JavaScript
- **Vuetify 1.5** - Material Design component framework
- **Vue Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Build Tools
- **MSBuild** - .NET build system
- **Vue CLI 3.10** - Vue.js development tooling
- **npm/Webpack** - Package management and bundling

## Project Structure

```
AmmanWeather/
├── ClientApp/                  # Frontend Vue.js application
│   ├── components/            # Vue components
│   │   ├── App/              # Root app component
│   │   ├── Index/            # Landing page component
│   │   └── Weather/          # Weather display component
│   ├── Services/             # Service layer
│   │   ├── AxiosService.ts
│   │   ├── LoaderService.ts
│   │   ├── TelemetryService.ts
│   │   └── WeatherService.ts # Weather API service
│   ├── plugins/              # Vue plugins
│   ├── shared/               # Shared utilities
│   ├── main.ts              # Application entry point
│   └── router.ts            # Route configuration
├── Config/                   # Configuration files
├── Controller/              # API controllers (empty - for future use)
├── Models/                  # Data models (empty - for future use)
├── Pages/                   # Razor pages
├── Properties/              # Launch settings
├── public/                  # Static assets
├── Program.cs              # Application startup
├── Startup.cs              # Service configuration
└── AmmanWeather.csproj     # Project file
```

## Prerequisites

- .NET Core SDK 3.1 or higher
- Node.js 12.x or higher
- npm 6.x or higher

## Installation

1. **Clone the repository**
   ```bash
   cd AmmanWeather
   ```

2. **Install npm dependencies**
   ```bash
   npm install
   ```

3. **Restore .NET packages**
   ```bash
   dotnet restore
   ```

## Development

### Running the Application

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Run the backend**
   ```bash
   dotnet run
   ```

3. **Access the application**
   ```
   http://localhost:5000/applications/ammanweather/
   ```

### Development Mode

For frontend development with hot reload:
```bash
npm run serve
```

For watching frontend changes:
```bash
npm run watch
```

## API Integration

The application uses the OpenWeatherMap API to fetch weather data. The API key is configured in:
```
ClientApp/Services/WeatherService.ts
```

## Configuration Files

- **appsettings.json** - Backend configuration
- **vue.config.js** - Vue CLI configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - npm dependencies
- **.npmrc** - npm registry configuration

## Building for Production

```bash
# Build frontend
npm run build

# Build backend
dotnet build --configuration Release

# Publish application
dotnet publish --configuration Release
```

## Routes

- `/` - Weather dashboard (default)
- `/weather` - Weather dashboard
- `/index` - Landing page

## Features in Detail

### Current Weather Display
- Current temperature
- "Feels like" temperature
- Weather description
- Location (Amman, Jordan)
- Humidity percentage
- Wind speed

### 5-Day Forecast
- Daily temperature predictions
- Weather conditions
- Visual weather icons
- Responsive grid layout

### UI/UX Features
- Gradient purple background
- Real-time clock
- Loading states
- Error handling
- Refresh functionality
- Hover effects on cards
- Mobile-responsive design

## Environment Configuration

Update the following files for different environments:

- **appsettings.Development.json** - Development settings
- **appsettings.json** - Production settings
- **Properties/launchSettings.json** - Launch profiles

## Port Configuration

Default port: **5000**

To change the port, update:
```json
// Properties/launchSettings.json
{
  "profiles": {
    "AmmanWeather": {
      "applicationUrl": "http://0.0.0.0:YOUR_PORT/"
    }
  }
}
```

## Logging

Application logs are stored in:
```
App_Data/logs/
```

Configuration: `Config/NLog.config`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is part of the Najiz Framework ecosystem.

## Support

For issues and questions, please refer to the Najiz Framework documentation.

## Version

- Application Version: 0.1.0
- Vue.js: 2.6.10
- ASP.NET Core: 3.1
- TypeScript: 4.5.5
- Vuetify: 1.5.14

---

**Built with ❤️ using Najiz.MicroTemplate**
