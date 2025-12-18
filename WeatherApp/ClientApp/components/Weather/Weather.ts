import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './Weather.html';
import WeatherService, { WeatherViewModel } from '@/Services/WeatherService';

@WithRender
@Component
export default class Weather extends Vue {
    @Inject(WeatherService) private weatherService!: WeatherService;

    public weather: WeatherViewModel | null = null;
    public hasError: boolean = false;

    public mounted() {
        this.loadWeather();
    }

    private async loadWeather() {
        this.hasError = false;
        const data = await this.weatherService.getTodayWeather();
        if (data) {
            this.weather = data;
        } else {
            this.hasError = true;
        }
    }
}
