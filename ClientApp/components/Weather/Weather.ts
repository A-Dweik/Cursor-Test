import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Weather.html';
import { Inject } from 'vue-di-container';
import WeatherService from '@/Services/WeatherService';
import { WeatherData, WeatherForecast } from '@/Services/Models/WeatherModels';

@WithRender
@Component({})
export default class Weather extends Vue {
    @Inject(WeatherService) public weatherService!: WeatherService;

    public currentWeather: WeatherData | null = null;
    public forecast: WeatherForecast[] = [];
    public loading: boolean = false;
    public error: string = '';

    // German cities with their coordinates
    public cities = [
        { name: 'برلين', nameEn: 'Berlin', lat: 52.52, lon: 13.405 },
        { name: 'ميونخ', nameEn: 'Munich', lat: 48.1351, lon: 11.582 },
        { name: 'هامبورغ', nameEn: 'Hamburg', lat: 53.5511, lon: 9.9937 },
        { name: 'فرانكفورت', nameEn: 'Frankfurt', lat: 50.1109, lon: 8.6821 },
        { name: 'كولونيا', nameEn: 'Cologne', lat: 50.9375, lon: 6.9603 },
        { name: 'شتوتغارت', nameEn: 'Stuttgart', lat: 48.7758, lon: 9.1829 },
    ];

    public selectedCity = this.cities[0];

    public async mounted() {
        await this.loadWeatherData();
    }

    public async loadWeatherData() {
        this.loading = true;
        this.error = '';
        
        try {
            // Load current weather
            this.currentWeather = await this.weatherService.getCurrentWeather(
                this.selectedCity.lat,
                this.selectedCity.lon
            );
            
            // Update location name
            if (this.currentWeather) {
                this.currentWeather.location = `${this.selectedCity.name}، ألمانيا`;
            }

            // Load forecast
            this.forecast = await this.weatherService.getWeatherForecast(
                this.selectedCity.lat,
                this.selectedCity.lon
            );
        } catch (err) {
            this.error = 'حدث خطأ أثناء تحميل بيانات الطقس';
        } finally {
            this.loading = false;
        }
    }

    public async onCityChange() {
        await this.loadWeatherData();
    }

    public getDayName(dateString: string): string {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'اليوم';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'غداً';
        }

        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[date.getDay()];
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
    }

    public goBack() {
        this.$router.push('/');
    }
}
