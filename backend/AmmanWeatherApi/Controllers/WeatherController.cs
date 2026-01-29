using Microsoft.AspNetCore.Mvc;
using AmmanWeatherApi.Models;
using AmmanWeatherApi.Services;

namespace AmmanWeatherApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;
    private readonly ILogger<WeatherController> _logger;

    public WeatherController(IWeatherService weatherService, ILogger<WeatherController> logger)
    {
        _weatherService = weatherService;
        _logger = logger;
    }

    /// <summary>
    /// Gets the current weather for Amman, Jordan
    /// </summary>
    [HttpGet("amman")]
    public async Task<ActionResult<WeatherData>> GetAmmanWeather()
    {
        _logger.LogInformation("Fetching weather data for Amman, Jordan");
        
        var weatherData = await _weatherService.GetAmmanWeatherAsync();
        
        if (weatherData == null)
        {
            _logger.LogWarning("Failed to retrieve weather data");
            return StatusCode(503, new { message = "Unable to fetch weather data at this time" });
        }

        return Ok(weatherData);
    }

    /// <summary>
    /// Gets weather description for a given weather code
    /// </summary>
    [HttpGet("description/{code}")]
    public ActionResult<string> GetWeatherDescription(int code)
    {
        var description = _weatherService.GetWeatherDescription(code);
        return Ok(new { code, description });
    }

    /// <summary>
    /// Gets weather icon for a given weather code
    /// </summary>
    [HttpGet("icon/{code}")]
    public ActionResult<string> GetWeatherIcon(int code)
    {
        var icon = _weatherService.GetWeatherIcon(code);
        return Ok(new { code, icon });
    }

    /// <summary>
    /// Gets wind direction text from degrees
    /// </summary>
    [HttpGet("wind-direction/{degrees}")]
    public ActionResult<string> GetWindDirection(double degrees)
    {
        var direction = _weatherService.GetWindDirection(degrees);
        return Ok(new { degrees, direction });
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    [HttpGet("health")]
    public ActionResult HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}
