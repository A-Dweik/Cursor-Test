using System.Text.Json;
using AmmanWeatherApi.Models;

namespace AmmanWeatherApi.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<WeatherService> _logger;
    
    // Amman, Jordan coordinates
    private const double AMMAN_LAT = 31.9454;
    private const double AMMAN_LON = 35.9284;
    private const string API_URL = "https://api.open-meteo.com/v1/forecast";

    public WeatherService(HttpClient httpClient, ILogger<WeatherService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<WeatherData?> GetAmmanWeatherAsync()
    {
        try
        {
            var url = $"{API_URL}?latitude={AMMAN_LAT}&longitude={AMMAN_LON}&current_weather=true&current=relative_humidity_2m,apparent_temperature,surface_pressure";
            
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            
            var content = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            
            var openMeteoResponse = JsonSerializer.Deserialize<OpenMeteoResponse>(content, options);
            
            if (openMeteoResponse?.Current_Weather == null)
            {
                _logger.LogError("Failed to deserialize weather data");
                return null;
            }

            return new WeatherData
            {
                Temperature = openMeteoResponse.Current_Weather.Temperature,
                Windspeed = openMeteoResponse.Current_Weather.Windspeed,
                Weathercode = openMeteoResponse.Current_Weather.Weathercode,
                Time = openMeteoResponse.Current_Weather.Time,
                WindDirection = openMeteoResponse.Current_Weather.Winddirection,
                Humidity = openMeteoResponse.Current?.Relative_Humidity_2m,
                FeelsLike = openMeteoResponse.Current?.Apparent_Temperature,
                Pressure = openMeteoResponse.Current?.Surface_Pressure
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching weather data from Open-Meteo API");
            return null;
        }
    }

    public string GetWeatherDescription(int code)
    {
        return code switch
        {
            0 => "Clear sky",
            1 => "Mainly clear",
            2 => "Partly cloudy",
            3 => "Overcast",
            45 => "Foggy",
            48 => "Depositing rime fog",
            51 => "Light drizzle",
            53 => "Moderate drizzle",
            55 => "Dense drizzle",
            61 => "Slight rain",
            63 => "Moderate rain",
            65 => "Heavy rain",
            71 => "Slight snow",
            73 => "Moderate snow",
            75 => "Heavy snow",
            80 => "Slight rain showers",
            81 => "Moderate rain showers",
            82 => "Violent rain showers",
            95 => "Thunderstorm",
            96 => "Thunderstorm with slight hail",
            99 => "Thunderstorm with heavy hail",
            _ => "Unknown"
        };
    }

    public string GetWeatherIcon(int code)
    {
        if (code == 0) return "☀️";
        if (code <= 3) return "⛅";
        if (code <= 48) return "🌫️";
        if (code <= 55) return "🌧️";
        if (code <= 65) return "🌧️";
        if (code <= 75) return "❄️";
        if (code <= 82) return "🌦️";
        return "⛈️";
    }

    public string GetWindDirection(double degrees)
    {
        string[] directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" };
        int index = (int)Math.Round(degrees / 45) % 8;
        return directions[index];
    }
}
