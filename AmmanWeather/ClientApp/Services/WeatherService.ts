import AxiosService from '@/Services/AxiosService';
import { Inject, Service } from 'vue-di-container';

export interface WeatherData {
    temperature: number;
    feelsLike: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    cityName: string;
}

export interface ForecastData {
    date: string;
    temp: number;
    description: string;
    icon: string;
}

@Service()
export default class WeatherService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    
    private readonly apiKey = '895284fb2d2c50a520ea537456963d9c'; // OpenWeatherMap API key
    private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

    public async getCurrentWeather(city: string = 'Amman'): Promise<WeatherData> {
        try {
            const response = await this.axiosService.axiosInstance.get(
                `${this.baseUrl}/weather?q=${city},JO&units=metric&appid=${this.apiKey}`
            );
            
            const data = response.data;
            return {
                temperature: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon,
                cityName: data.name,
            };
        } catch (error) {
            throw new Error('Failed to fetch weather data');
        }
    }

    public async getForecast(city: string = 'Amman'): Promise<ForecastData[]> {
        try {
            const response = await this.axiosService.axiosInstance.get(
                `${this.baseUrl}/forecast?q=${city},JO&units=metric&appid=${this.apiKey}`
            );
            
            const dailyData: ForecastData[] = [];
            const processedDates = new Set<string>();
            
            response.data.list.forEach((item: any) => {
                const date = new Date(item.dt * 1000);
                const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                
                if (!processedDates.has(dateStr) && dailyData.length < 5) {
                    processedDates.add(dateStr);
                    dailyData.push({
                        date: dateStr,
                        temp: Math.round(item.main.temp),
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                    });
                }
            });
            
            return dailyData;
        } catch (error) {
            throw new Error('Failed to fetch forecast data');
        }
    }

    public getWeatherIconUrl(icon: string): string {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
}
