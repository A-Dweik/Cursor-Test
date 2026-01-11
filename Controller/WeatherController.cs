using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace ZarqaWeather.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        [HttpGet("current")]
        public ActionResult<WeatherData> GetCurrentWeather()
        {
            var currentWeather = new WeatherData
            {
                City = "الزرقاء",
                Temperature = 28,
                FeelsLike = 30,
                Humidity = 45,
                WindSpeed = 15,
                Pressure = 1013,
                Description = "صافي",
                Icon = "mdi-weather-sunny",
                Date = DateTime.Now
            };

            return Ok(currentWeather);
        }

        [HttpGet("forecast")]
        public ActionResult<List<WeatherForecast>> GetWeatherForecast()
        {
            var forecast = new List<WeatherForecast>
            {
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(1),
                    TemperatureMax = 30,
                    TemperatureMin = 20,
                    Description = "غائم جزئياً",
                    Icon = "mdi-weather-partly-cloudy",
                    Humidity = 50,
                    WindSpeed = 12
                },
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(2),
                    TemperatureMax = 29,
                    TemperatureMin = 19,
                    Description = "صافي",
                    Icon = "mdi-weather-sunny",
                    Humidity = 42,
                    WindSpeed = 10
                },
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(3),
                    TemperatureMax = 27,
                    TemperatureMin = 18,
                    Description = "غائم",
                    Icon = "mdi-weather-cloudy",
                    Humidity = 55,
                    WindSpeed = 18
                },
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(4),
                    TemperatureMax = 31,
                    TemperatureMin = 21,
                    Description = "صافي",
                    Icon = "mdi-weather-sunny",
                    Humidity = 40,
                    WindSpeed = 8
                },
                new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(5),
                    TemperatureMax = 32,
                    TemperatureMin = 22,
                    Description = "حار وصافي",
                    Icon = "mdi-weather-sunny",
                    Humidity = 38,
                    WindSpeed = 7
                }
            };

            return Ok(forecast);
        }
    }

    public class WeatherData
    {
        public string City { get; set; }
        public int Temperature { get; set; }
        public int FeelsLike { get; set; }
        public int Humidity { get; set; }
        public int WindSpeed { get; set; }
        public int Pressure { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public DateTime Date { get; set; }
    }

    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureMax { get; set; }
        public int TemperatureMin { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public int Humidity { get; set; }
        public int WindSpeed { get; set; }
    }
}
