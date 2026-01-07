import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './IndexPage.html';
import WeatherService, { WeatherData, HourlyForecast, DailyForecast } from '@/Services/WeatherService';

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public loading: boolean = true;
    public currentWeather: WeatherData | null = null;
    public hourlyForecast: HourlyForecast[] = [];
    public dailyForecast: DailyForecast[] = [];
    public weatherAdvice: string = '';
    public selectedTab: number = 0;

    public async mounted() {
        await this.loadWeatherData();
    }

    public async loadWeatherData() {
        try {
            this.loading = true;
            
            // Load all weather data
            this.currentWeather = await this.weatherService.getCurrentWeather();
            this.hourlyForecast = await this.weatherService.getHourlyForecast();
            this.dailyForecast = await this.weatherService.getDailyForecast();
            
            // Get weather advice
            if (this.currentWeather) {
                this.weatherAdvice = this.weatherService.getWeatherAdvice(
                    this.currentWeather.temperature,
                    this.currentWeather.condition
                );
            }
        } catch (error) {
            console.error('Error loading weather data:', error);
        } finally {
            this.loading = false;
        }
    }

    public async refreshWeather() {
        await this.loadWeatherData();
    }

    public formatTime(dateTime: Date): string {
        return dateTime.toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    public getTemperatureColor(temp: number): string {
        if (temp >= 30) return 'error';
        if (temp >= 25) return 'orange';
        if (temp >= 15) return 'success';
        return 'info';
    }

    public getHumidityColor(humidity: number): string {
        if (humidity >= 70) return 'info';
        if (humidity >= 50) return 'success';
        return 'warning';
    }

    public getUVColor(uvIndex: number): string {
        if (uvIndex >= 8) return 'error';
        if (uvIndex >= 6) return 'orange';
        if (uvIndex >= 3) return 'warning';
        return 'success';
    }
}
