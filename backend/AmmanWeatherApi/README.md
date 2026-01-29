# Amman Weather API - .NET Backend

ASP.NET Core Web API that provides weather data for Amman, Jordan. This API acts as a backend service for the Angular weather application, fetching data from the Open-Meteo API.

## 🚀 Features

- RESTful API endpoints for weather data
- Fetches real-time weather from Open-Meteo API
- CORS enabled for Angular frontend
- Swagger/OpenAPI documentation
- Health check endpoint
- Structured logging
- Clean architecture with services and controllers

## 📋 Prerequisites

- .NET 8.0 SDK or later
- Internet connection (for fetching weather data)

## 🔧 Installation

1. Navigate to the backend directory:
```bash
cd backend/AmmanWeatherApi
```

2. Restore dependencies:
```bash
dotnet restore
```

## 🏃 Running the Application

### Development Mode

```bash
dotnet run
```

The API will start on `http://localhost:5137`

### With Hot Reload (Watch Mode)

```bash
dotnet watch run
```

### Build for Production

```bash
dotnet build --configuration Release
dotnet run --configuration Release
```

## 📚 API Endpoints

### Weather Endpoints

- **GET** `/api/weather/amman` - Get current weather for Amman, Jordan
  - Returns: WeatherData object with temperature, wind speed, humidity, etc.

- **GET** `/api/weather/description/{code}` - Get weather description for weather code
  - Parameters: `code` (int) - Weather code from WMO
  - Returns: Weather description text

- **GET** `/api/weather/icon/{code}` - Get weather icon emoji for weather code
  - Parameters: `code` (int) - Weather code
  - Returns: Weather icon emoji

- **GET** `/api/weather/wind-direction/{degrees}` - Convert wind degrees to direction
  - Parameters: `degrees` (double) - Wind direction in degrees
  - Returns: Wind direction text (N, NE, E, SE, S, SW, W, NW)

- **GET** `/api/weather/health` - Health check endpoint
  - Returns: API health status

### Swagger Documentation

Access the Swagger UI at: `http://localhost:5137/swagger`

## 🏗️ Project Structure

```
AmmanWeatherApi/
├── Controllers/
│   └── WeatherController.cs    # API endpoints
├── Models/
│   └── WeatherData.cs           # Data models
├── Services/
│   ├── IWeatherService.cs       # Service interface
│   └── WeatherService.cs        # Weather service implementation
├── Program.cs                    # Application entry point
├── appsettings.json             # Configuration
└── AmmanWeatherApi.csproj       # Project file
```

## 🔌 CORS Configuration

The API is configured to allow requests from:
- `http://localhost:4200` (Angular development server)

To modify CORS settings, edit `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

## 🌍 Weather Data Source

This API uses the [Open-Meteo API](https://open-meteo.com/), a free weather API that doesn't require an API key. The API provides accurate weather data including:

- Temperature
- Wind speed and direction
- Weather conditions
- Humidity
- Feels-like temperature
- Atmospheric pressure

## 📝 Response Example

```json
{
  "temperature": 18.5,
  "windspeed": 12.3,
  "weathercode": 2,
  "time": "2024-01-27T15:00",
  "windDirection": 235.0,
  "humidity": 65.0,
  "feelsLike": 17.2,
  "pressure": 1013.5
}
```

## 🧪 Testing

### Manual Testing with curl

```bash
# Get weather data
curl http://localhost:5137/api/weather/amman

# Health check
curl http://localhost:5137/api/weather/health
```

### Using the .http file

Open `AmmanWeatherApi.http` in Visual Studio or Visual Studio Code with the REST Client extension.

## 🛠️ Technologies Used

- **ASP.NET Core 8.0** - Web framework
- **.NET 8.0** - Runtime
- **Swashbuckle** - Swagger/OpenAPI documentation
- **System.Text.Json** - JSON serialization
- **HttpClient** - HTTP requests

## 🔐 Security Notes

- No sensitive data or API keys required
- CORS is configured for development (localhost:4200)
- For production, update CORS policy to include production domain
- Consider adding rate limiting for production use
- HTTPS should be enabled for production deployments

## 📄 License

This project is open source and available for educational purposes.
