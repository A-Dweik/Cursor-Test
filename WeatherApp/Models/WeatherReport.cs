namespace Najiz.WeatherApp.Models
{
    public class WeatherReport
    {
        public string City { get; set; }
        public int TemperatureC { get; set; }
        public string Condition { get; set; }
        public int Humidity { get; set; }
        public int WindSpeedKph { get; set; }
        public string LastUpdated { get; set; }
    }
}
