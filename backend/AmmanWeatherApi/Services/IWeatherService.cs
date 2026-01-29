using AmmanWeatherApi.Models;

namespace AmmanWeatherApi.Services;

public interface IWeatherService
{
    Task<WeatherData?> GetAmmanWeatherAsync();
    string GetWeatherDescription(int code);
    string GetWeatherIcon(int code);
    string GetWindDirection(double degrees);
}
