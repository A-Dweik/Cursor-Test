import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Weather.html';
import WeatherService, { WeatherData } from '@/Services/WeatherService';
import { Inject } from 'vue-di-container';

@WithRender
@Component({})
export default class Weather extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public weatherData: WeatherData | null = null;
    public selectedCity: string = 'Riyadh';
    public cities: string[] = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'];
    public loading: boolean = false;

    public async mounted() {
        await this.loadWeather();
    }

    public async loadWeather() {
        this.loading = true;
        // Using mock data for demonstration
        // In production, you would call: await this.weatherService.getCurrentWeather(this.selectedCity)
        this.weatherData = this.weatherService.getMockWeather(this.selectedCity);
        this.loading = false;
    }

    public async onCityChange() {
        await this.loadWeather();
    }

    public getWeatherIcon(icon: string): string {
        // Map weather icons to weather conditions
        const iconMap: { [key: string]: string } = {
            '01d': '☀️',
            '01n': '🌙',
            '02d': '⛅',
            '02n': '☁️',
            '03d': '☁️',
            '03n': '☁️',
            '04d': '☁️',
            '04n': '☁️',
            '09d': '🌧️',
            '09n': '🌧️',
            '10d': '🌦️',
            '10n': '🌧️',
            '11d': '⛈️',
            '11n': '⛈️',
            '13d': '❄️',
            '13n': '❄️',
            '50d': '🌫️',
            '50n': '🌫️',
        };
        return iconMap[icon] || '☀️';
    }
}
