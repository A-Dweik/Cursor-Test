import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { WeatherData, WeatherForecast } from './Models/WeatherModels';

@Service()
export default class WeatherService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Open-Meteo API for German weather data
    // Using Berlin coordinates as default
    private readonly BERLIN_LAT = 52.52;
    private readonly BERLIN_LON = 13.405;

    public async getCurrentWeather(lat: number = this.BERLIN_LAT, lon: number = this.BERLIN_LON): Promise<WeatherData> {
        try {
            this.loaderService.ShowLoader();
            
            // Open-Meteo API is free and doesn't require authentication
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe/Berlin`;
            
            const result = await this.axiosService.axiosInstance.get(url);
            this.loaderService.HideLoader();
            
            return this.transformWeatherData(result.data);
        } catch (exception) {
            this.loaderService.HideLoader();
            // Return mock data if API fails
            return this.getMockWeatherData();
        }
    }

    public async getWeatherForecast(lat: number = this.BERLIN_LAT, lon: number = this.BERLIN_LON): Promise<WeatherForecast[]> {
        try {
            this.loaderService.ShowLoader();
            
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Europe/Berlin&forecast_days=7`;
            
            const result = await this.axiosService.axiosInstance.get(url);
            this.loaderService.HideLoader();
            
            return this.transformForecastData(result.data);
        } catch (exception) {
            this.loaderService.HideLoader();
            return this.getMockForecastData();
        }
    }

    private transformWeatherData(data: any): WeatherData {
        const current = data.current_weather;
        return {
            temperature: Math.round(current.temperature),
            windSpeed: Math.round(current.windspeed),
            weatherCode: current.weathercode,
            description: this.getWeatherDescription(current.weathercode),
            icon: this.getWeatherIcon(current.weathercode),
            time: current.time,
            location: 'برلين، ألمانيا',
        };
    }

    private transformForecastData(data: any): WeatherForecast[] {
        const daily = data.daily;
        const forecasts: WeatherForecast[] = [];
        
        for (let i = 0; i < daily.time.length; i++) {
            forecasts.push({
                date: daily.time[i],
                maxTemp: Math.round(daily.temperature_2m_max[i]),
                minTemp: Math.round(daily.temperature_2m_min[i]),
                precipitation: daily.precipitation_sum[i],
                weatherCode: daily.weathercode[i],
                description: this.getWeatherDescription(daily.weathercode[i]),
                icon: this.getWeatherIcon(daily.weathercode[i]),
            });
        }
        
        return forecasts;
    }

    private getWeatherDescription(code: number): string {
        // WMO Weather interpretation codes
        const descriptions: { [key: number]: string } = {
            0: 'سماء صافية',
            1: 'صافية في الغالب',
            2: 'غائم جزئياً',
            3: 'غائم',
            45: 'ضباب',
            48: 'ضباب متجمد',
            51: 'رذاذ خفيف',
            53: 'رذاذ متوسط',
            55: 'رذاذ كثيف',
            61: 'مطر خفيف',
            63: 'مطر متوسط',
            65: 'مطر غزير',
            71: 'ثلج خفيف',
            73: 'ثلج متوسط',
            75: 'ثلج كثيف',
            77: 'حبيبات ثلجية',
            80: 'زخات مطر خفيفة',
            81: 'زخات مطر متوسطة',
            82: 'زخات مطر غزيرة',
            85: 'زخات ثلج خفيفة',
            86: 'زخات ثلج كثيفة',
            95: 'عاصفة رعدية',
            96: 'عاصفة رعدية مع برَد خفيف',
            99: 'عاصفة رعدية مع برَد كثيف',
        };
        
        return descriptions[code] || 'غير معروف';
    }

    private getWeatherIcon(code: number): string {
        // Material Design Icons for weather
        if (code === 0) return 'mdi-weather-sunny';
        if (code === 1 || code === 2) return 'mdi-weather-partly-cloudy';
        if (code === 3) return 'mdi-weather-cloudy';
        if (code === 45 || code === 48) return 'mdi-weather-fog';
        if (code >= 51 && code <= 55) return 'mdi-weather-rainy';
        if (code >= 61 && code <= 65) return 'mdi-weather-pouring';
        if (code >= 71 && code <= 77) return 'mdi-weather-snowy';
        if (code >= 80 && code <= 82) return 'mdi-weather-rainy';
        if (code >= 85 && code <= 86) return 'mdi-weather-snowy-heavy';
        if (code >= 95) return 'mdi-weather-lightning';
        return 'mdi-weather-cloudy';
    }

    private getMockWeatherData(): WeatherData {
        return {
            temperature: 18,
            windSpeed: 15,
            weatherCode: 2,
            description: 'غائم جزئياً',
            icon: 'mdi-weather-partly-cloudy',
            time: new Date().toISOString(),
            location: 'برلين، ألمانيا',
        };
    }

    private getMockForecastData(): WeatherForecast[] {
        const forecasts: WeatherForecast[] = [];
        const today = new Date();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            forecasts.push({
                date: date.toISOString().split('T')[0],
                maxTemp: Math.round(15 + Math.random() * 10),
                minTemp: Math.round(5 + Math.random() * 8),
                precipitation: Math.random() * 5,
                weatherCode: Math.floor(Math.random() * 3),
                description: 'غائم جزئياً',
                icon: 'mdi-weather-partly-cloudy',
            });
        }
        
        return forecasts;
    }
}
