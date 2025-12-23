import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';

export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
}

@Service()
export default class WeatherService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getCurrentWeather(city: string): Promise<WeatherData | null> {
        try {
            this.loaderService.ShowLoader();
            
            // Using OpenWeatherMap API as an example
            // In production, you would call your backend API
            const apiKey = 'demo'; // Demo key for testing
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            
            const result = await this.axiosService.axiosInstance.get(url);
            
            const weatherData: WeatherData = {
                city: result.data.name,
                temperature: Math.round(result.data.main.temp),
                description: result.data.weather[0].description,
                humidity: result.data.main.humidity,
                windSpeed: result.data.wind.speed,
                icon: result.data.weather[0].icon,
            };
            
            this.loaderService.HideLoader();
            return weatherData;
        } catch (exception) {
            this.loaderService.HideLoader();
            console.error('Error fetching weather:', exception);
            return null;
        }
    }

    // Get mock weather data for demo purposes
    public getMockWeather(city: string): WeatherData {
        const cities: { [key: string]: WeatherData } = {
            'Riyadh': {
                city: 'Riyadh',
                temperature: 28,
                description: 'Sunny',
                humidity: 15,
                windSpeed: 12,
                icon: '01d',
            },
            'Jeddah': {
                city: 'Jeddah',
                temperature: 32,
                description: 'Clear Sky',
                humidity: 65,
                windSpeed: 8,
                icon: '01d',
            },
            'Dammam': {
                city: 'Dammam',
                temperature: 26,
                description: 'Partly Cloudy',
                humidity: 70,
                windSpeed: 15,
                icon: '02d',
            },
            'Mecca': {
                city: 'Mecca',
                temperature: 35,
                description: 'Hot and Sunny',
                humidity: 20,
                windSpeed: 5,
                icon: '01d',
            },
            'Medina': {
                city: 'Medina',
                temperature: 30,
                description: 'Clear',
                humidity: 18,
                windSpeed: 10,
                icon: '01d',
            },
        };

        return cities[city] || cities['Riyadh'];
    }
}
