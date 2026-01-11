export default interface WeatherData {
    city: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    description: string;
    icon: string;
    date: Date;
}
