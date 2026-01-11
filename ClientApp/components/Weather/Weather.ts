import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Weather.html';
import { Inject } from 'vue-di-container';
import WeatherService from '@/Services/Weather/WeatherService';
import WeatherData from '@/Services/Weather/WeatherData';
import WeatherForecast from '@/Services/Weather/WeatherForecast';

@WithRender
@Component({})
export default class Weather extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public loading: boolean = false;
    public currentWeather: WeatherData | null = null;
    public forecast: WeatherForecast[] = [];
    public error: string = '';

    public async mounted() {
        await this.loadWeatherData();
    }

    public async loadWeatherData() {
        this.loading = true;
        this.error = '';
        
        try {
            this.currentWeather = await this.weatherService.getCurrentWeather();
            this.forecast = await this.weatherService.getWeatherForecast();
        } catch (e) {
            this.error = 'حدث خطأ في تحميل بيانات الطقس';
        } finally {
            this.loading = false;
        }
    }

    public formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(date).toLocaleDateString('ar-JO', options);
    }

    public formatTime(date: Date): string {
        return new Date(date).toLocaleTimeString('ar-JO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    public goBack(): void {
        this.$router.push('/');
    }
}
