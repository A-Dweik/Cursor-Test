import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import AxiosService from '@/Services/AxiosService';

interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    feelsLike: number;
    pressure: number;
    cityName: string;
}

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(AxiosService) public axiosService!: AxiosService;

    public loading: boolean = true;
    public weatherData: WeatherData | null = null;
    public error: string = '';
    public lastUpdate: string = '';

    async mounted() {
        await this.loadWeatherData();
        // Refresh every 10 minutes
        setInterval(() => {
            this.loadWeatherData();
        }, 600000);
    }

    async loadWeatherData() {
        try {
            this.loading = true;
            this.error = '';
            
            // Using OpenWeatherMap API (free tier)
            // For Zarqa, Jordan coordinates: lat=32.0667, lon=36.1000
            const apiKey = '8c8f8e9c8c8f8e9c8c8f8e9c8c8f8e9c'; // This should be stored in config
            const lat = 32.0667;
            const lon = 36.1000;
            
            // Using a mock API call for demonstration
            // In production, you would call: https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ar
            
            // Mock data for Zarqa weather
            const mockData = {
                main: {
                    temp: 22,
                    feels_like: 21,
                    humidity: 45,
                    pressure: 1013
                },
                weather: [{
                    description: 'صافٍ',
                    icon: 'mdi-weather-sunny'
                }],
                wind: {
                    speed: 3.5
                },
                name: 'الزرقاء'
            };

            this.weatherData = {
                temperature: Math.round(mockData.main.temp),
                feelsLike: Math.round(mockData.main.feels_like),
                humidity: mockData.main.humidity,
                pressure: mockData.main.pressure,
                windSpeed: mockData.wind.speed,
                description: mockData.weather[0].description,
                icon: mockData.weather[0].icon,
                cityName: mockData.name
            };

            this.lastUpdate = new Date().toLocaleString('ar-JO', {
                hour: '2-digit',
                minute: '2-digit',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            this.loading = false;
        } catch (err: any) {
            this.error = 'حدث خطأ في تحميل بيانات الطقس';
            this.loading = false;
        }
    }

    getWeatherIcon(): string {
        if (!this.weatherData) return 'mdi-weather-cloudy';
        return this.weatherData.icon;
    }

    getTemperatureColor(): string {
        if (!this.weatherData) return '';
        const temp = this.weatherData.temperature;
        if (temp >= 35) return 'error';
        if (temp >= 25) return 'warning';
        if (temp >= 15) return 'success';
        return 'info';
    }
}
