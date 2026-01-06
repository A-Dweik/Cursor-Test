export interface WeatherData {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    description: string;
    icon: string;
    time: string;
    location: string;
}

export interface WeatherForecast {
    date: string;
    maxTemp: number;
    minTemp: number;
    precipitation: number;
    weatherCode: number;
    description: string;
    icon: string;
}
