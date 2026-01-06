import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import WeatherService from '@/Services/Weather/WeatherService';
import { WeatherData } from '@/Services/Weather/WeatherModels';

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public weatherData: WeatherData | null = null;
    public loading: boolean = false;
    public error: string = '';

    public async mounted() {
        await this.loadWeather();
    }

    public async loadWeather() {
        try {
            this.loading = true;
            this.error = '';
            this.weatherData = await this.weatherService.getWeatherForAmman();
        } catch (err) {
            this.error = 'فشل في تحميل بيانات الطقس. يرجى المحاولة مرة أخرى.';
            console.error('Error loading weather:', err);
        } finally {
            this.loading = false;
        }
    }

    public getWeatherIcon(condition: string): string {
        const lowerCondition = condition.toLowerCase();
        if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
            return 'mdi-weather-sunny';
        } else if (lowerCondition.includes('cloud')) {
            return 'mdi-weather-cloudy';
        } else if (lowerCondition.includes('rain')) {
            return 'mdi-weather-rainy';
        } else if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) {
            return 'mdi-weather-lightning';
        } else if (lowerCondition.includes('snow')) {
            return 'mdi-weather-snowy';
        } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
            return 'mdi-weather-fog';
        } else if (lowerCondition.includes('wind')) {
            return 'mdi-weather-windy';
        }
        return 'mdi-weather-partly-cloudy';
    }

    public getTemperatureColor(temp: number): string {
        if (temp >= 35) return 'error';
        if (temp >= 25) return 'orange';
        if (temp >= 15) return 'success';
        return 'info';
    }

    public getWindDirection(degrees: number): string {
        const directions = ['شمال', 'شمال شرق', 'شرق', 'جنوب شرق', 'جنوب', 'جنوب غرب', 'غرب', 'شمال غرب'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }
}
