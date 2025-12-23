import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Weather.html';
import WeatherService, { WeatherData, ForecastData } from '@/Services/WeatherService';
import { Inject } from 'vue-di-container';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
    components: {},
})
export default class Weather extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public currentWeather: WeatherData | null = null;
    public forecast: ForecastData[] = [];
    public loading: boolean = true;
    public error: string = '';
    public currentTime: string = '';
    public currentDate: string = '';

    public async mounted() {
        this.updateDateTime();
        setInterval(() => {
            this.updateDateTime();
        }, 1000);

        await this.loadWeatherData();
    }

    private updateDateTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        this.currentDate = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    public async loadWeatherData() {
        try {
            this.loading = true;
            this.error = '';
            
            const [weather, forecast] = await Promise.all([
                this.weatherService.getCurrentWeather('Amman'),
                this.weatherService.getForecast('Amman')
            ]);
            
            this.currentWeather = weather;
            this.forecast = forecast;
        } catch (err) {
            this.error = 'Unable to load weather data. Please try again later.';
            Toaster.error('Failed to load weather data');
        } finally {
            this.loading = false;
        }
    }

    public getWeatherIcon(icon: string): string {
        return this.weatherService.getWeatherIconUrl(icon);
    }

    public capitalizeFirst(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
