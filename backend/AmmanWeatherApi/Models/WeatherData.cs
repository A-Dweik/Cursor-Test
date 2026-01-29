namespace AmmanWeatherApi.Models;

public class WeatherData
{
    public double Temperature { get; set; }
    public double Windspeed { get; set; }
    public int Weathercode { get; set; }
    public string Time { get; set; } = string.Empty;
    public double? WindDirection { get; set; }
    public double? Humidity { get; set; }
    public double? FeelsLike { get; set; }
    public double? Pressure { get; set; }
}

public class OpenMeteoResponse
{
    public CurrentWeather? Current_Weather { get; set; }
    public CurrentData? Current { get; set; }
}

public class CurrentWeather
{
    public double Temperature { get; set; }
    public double Windspeed { get; set; }
    public int Weathercode { get; set; }
    public string Time { get; set; } = string.Empty;
    public double Winddirection { get; set; }
}

public class CurrentData
{
    public double? Relative_Humidity_2m { get; set; }
    public double? Apparent_Temperature { get; set; }
    public double? Surface_Pressure { get; set; }
}
