using Microsoft.AspNetCore.Mvc;
using Najiz.WeatherApp.Models;

namespace Najiz.WeatherApp.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        [HttpGet("today")]
        public ActionResult<WeatherReport> GetToday()
        {
            var report = new WeatherReport
            {
                City = "Riyadh",
                TemperatureC = 32,
                Condition = "Sunny",
                Humidity = 18,
                WindSpeedKph = 12,
                LastUpdated = "08:00 AM"
            };

            return Ok(report);
        }
    }
}
