import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import WeatherData from './WeatherData';
import WeatherForecast from './WeatherForecast';

@Service()
export default class WeatherService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getCurrentWeather(): Promise<WeatherData> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/Weather/current';
            const result = await this.axiosService.axiosInstance.get<WeatherData>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            // Return static data for now (as per requirements)
            return this.getStaticCurrentWeather();
        }
    }

    public async getWeatherForecast(): Promise<WeatherForecast[]> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/Weather/forecast';
            const result = await this.axiosService.axiosInstance.get<WeatherForecast[]>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            // Return static data for now (as per requirements)
            return this.getStaticForecast();
        }
    }

    private getStaticCurrentWeather(): WeatherData {
        return {
            city: 'الزرقاء',
            temperature: 28,
            feelsLike: 30,
            humidity: 45,
            windSpeed: 15,
            pressure: 1013,
            description: 'صافي',
            icon: 'mdi-weather-sunny',
            date: new Date(),
        };
    }

    private getStaticForecast(): WeatherForecast[] {
        const today = new Date();
        return [
            {
                date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
                temperatureMax: 30,
                temperatureMin: 20,
                description: 'غائم جزئياً',
                icon: 'mdi-weather-partly-cloudy',
                humidity: 50,
                windSpeed: 12,
            },
            {
                date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
                temperatureMax: 29,
                temperatureMin: 19,
                description: 'صافي',
                icon: 'mdi-weather-sunny',
                humidity: 42,
                windSpeed: 10,
            },
            {
                date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
                temperatureMax: 27,
                temperatureMin: 18,
                description: 'غائم',
                icon: 'mdi-weather-cloudy',
                humidity: 55,
                windSpeed: 18,
            },
            {
                date: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
                temperatureMax: 31,
                temperatureMin: 21,
                description: 'صافي',
                icon: 'mdi-weather-sunny',
                humidity: 40,
                windSpeed: 8,
            },
            {
                date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
                temperatureMax: 32,
                temperatureMin: 22,
                description: 'حار وصافي',
                icon: 'mdi-weather-sunny',
                humidity: 38,
                windSpeed: 7,
            },
        ];
    }
}
