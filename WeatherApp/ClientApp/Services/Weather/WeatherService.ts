import { Service } from 'vue-di-container';
import { WeatherData, WeatherApiResponse } from './WeatherModels';
import { Inject } from 'vue-di-container';
import AxiosService from '../AxiosService';

@Service()
export default class WeatherService {
    @Inject(AxiosService) public axiosService!: AxiosService;

    /**
     * Get weather data for Amman, Jordan
     * This method generates realistic mock data for demonstration purposes
     * In production, replace with actual API call to OpenWeatherMap or similar service
     */
    public async getWeatherForAmman(): Promise<WeatherData> {
        // Simulate API delay
        await this.delay(800);

        // Generate realistic weather data for Amman
        const mockData = this.generateMockWeatherData();
        return mockData;
    }

    /**
     * Generate realistic mock weather data for Amman
     * This simulates what would be returned from a real weather API
     */
    private generateMockWeatherData(): WeatherData {
        const now = new Date();
        const hour = now.getHours();

        // Base temperature varies by time of day and season
        const month = now.getMonth(); // 0-11
        let baseTemp = 20; // Default spring/fall temperature

        // Adjust for seasons (Amman climate)
        if (month >= 5 && month <= 8) {
            // Summer (June-September): Hot
            baseTemp = 28 + Math.random() * 8; // 28-36°C
        } else if (month >= 11 || month <= 2) {
            // Winter (December-March): Cold
            baseTemp = 8 + Math.random() * 8; // 8-16°C
        } else {
            // Spring/Fall: Mild
            baseTemp = 18 + Math.random() * 8; // 18-26°C
        }

        // Adjust for time of day
        let timeAdjustment = 0;
        if (hour >= 6 && hour < 12) {
            timeAdjustment = -2; // Morning cooler
        } else if (hour >= 12 && hour < 17) {
            timeAdjustment = 3; // Afternoon hotter
        } else if (hour >= 17 && hour < 21) {
            timeAdjustment = 0; // Evening moderate
        } else {
            timeAdjustment = -4; // Night cooler
        }

        const temperature = baseTemp + timeAdjustment;
        const feelsLike = temperature + (Math.random() * 4 - 2);

        // Weather conditions based on season and random
        const conditions = this.getRandomWeatherCondition(month);

        // Humidity varies by season
        const humidity = month >= 5 && month <= 8 
            ? 20 + Math.floor(Math.random() * 30) // Summer: 20-50%
            : 40 + Math.floor(Math.random() * 40); // Winter: 40-80%

        // Wind speed (km/h)
        const windSpeed = 5 + Math.floor(Math.random() * 25); // 5-30 km/h
        const windDirection = Math.floor(Math.random() * 360); // 0-360 degrees

        // Pressure (typical range)
        const pressure = 1010 + Math.floor(Math.random() * 20); // 1010-1030 hPa

        // Visibility (km)
        const visibility = 8 + Math.floor(Math.random() * 7); // 8-15 km

        // Sunrise and sunset (approximate for Amman)
        const sunrise = this.calculateSunrise(month);
        const sunset = this.calculateSunset(month);

        // Temperature range
        const tempMin = temperature - (2 + Math.random() * 3);
        const tempMax = temperature + (2 + Math.random() * 5);

        return {
            temperature,
            feelsLike,
            tempMin,
            tempMax,
            humidity,
            pressure,
            windSpeed,
            windDirection,
            visibility,
            condition: conditions.main,
            description: conditions.description,
            sunrise,
            sunset,
            timestamp: now.toLocaleString('ar-JO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            city: 'عمان',
            country: 'الأردن',
        };
    }

    /**
     * Get random weather condition based on season
     */
    private getRandomWeatherCondition(month: number): { main: string; description: string } {
        const conditions = [
            { main: 'صافي', description: 'سماء صافية' },
            { main: 'غيوم متفرقة', description: 'غيوم متفرقة' },
            { main: 'غائم جزئياً', description: 'غائم جزئياً' },
            { main: 'غائم', description: 'سماء ملبدة بالغيوم' },
        ];

        // Add rain for winter months
        if (month >= 11 || month <= 3) {
            conditions.push(
                { main: 'ممطر', description: 'أمطار خفيفة' },
                { main: 'ممطر', description: 'أمطار متوسطة' }
            );
        }

        const randomIndex = Math.floor(Math.random() * conditions.length);
        return conditions[randomIndex];
    }

    /**
     * Calculate sunrise time based on month (approximate for Amman)
     */
    private calculateSunrise(month: number): string {
        const summerSunrise = '05:30';
        const winterSunrise = '06:45';
        
        if (month >= 4 && month <= 8) {
            return summerSunrise;
        } else {
            return winterSunrise;
        }
    }

    /**
     * Calculate sunset time based on month (approximate for Amman)
     */
    private calculateSunset(month: number): string {
        const summerSunset = '19:30';
        const winterSunset = '17:00';
        
        if (month >= 4 && month <= 8) {
            return summerSunset;
        } else {
            return winterSunset;
        }
    }

    /**
     * Simulate API delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * PRODUCTION METHOD: Fetch real weather data from API
     * Uncomment and use this method when you have an API key
     * 
     * Example using OpenWeatherMap API:
     */
    /*
    public async getWeatherForAmmanFromAPI(): Promise<WeatherData> {
        try {
            const apiKey = window.$config.Weather.ApiKey;
            const city = window.$config.Weather.City || 'Amman';
            const country = window.$config.Weather.Country || 'JO';
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=ar`;
            
            const response = await this.axiosService.axiosInstance.get<WeatherApiResponse>(url);
            const data = response.data;
            
            return {
                temperature: data.main.temp,
                feelsLike: data.main.feels_like,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
                windDirection: data.wind.deg,
                visibility: data.visibility / 1000, // Convert m to km
                condition: data.weather[0].main,
                description: data.weather[0].description,
                sunrise: this.formatTime(data.sys.sunrise),
                sunset: this.formatTime(data.sys.sunset),
                timestamp: new Date().toLocaleString('ar-JO'),
                city: data.name,
                country: data.sys.country,
            };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
    
    private formatTime(timestamp: number): string {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('ar-JO', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }
    */
}
