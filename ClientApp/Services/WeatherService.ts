import { Service } from 'vue-di-container';

export interface WeatherData {
    city: string;
    cityAr: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    conditionAr: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    icon: string;
    iconColor: string;
    lastUpdated: Date;
}

export interface HourlyForecast {
    time: string;
    temperature: number;
    condition: string;
    conditionAr: string;
    icon: string;
    precipitation: number;
}

export interface DailyForecast {
    date: string;
    dateAr: string;
    dayOfWeek: string;
    dayOfWeekAr: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    conditionAr: string;
    icon: string;
    precipitation: number;
    humidity: number;
}

@Service()
export default class WeatherService {
    
    private getRandomTemp(base: number, variance: number): number {
        return Math.round(base + (Math.random() * variance * 2 - variance));
    }

    private getArabicDayOfWeek(dayIndex: number): string {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[dayIndex];
    }

    private getArabicDate(date: Date): string {
        const months = [
            'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }

    public async getCurrentWeather(): Promise<WeatherData> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Static data with some randomization for realism
        const temp = this.getRandomTemp(18, 5);
        
        return {
            city: 'Amman',
            cityAr: 'عمّان',
            temperature: temp,
            feelsLike: temp - 2,
            condition: 'Partly Cloudy',
            conditionAr: 'غائم جزئياً',
            humidity: this.getRandomTemp(45, 10),
            windSpeed: this.getRandomTemp(15, 5),
            pressure: 1013,
            visibility: 10,
            uvIndex: 5,
            icon: 'mdi-weather-partly-cloudy',
            iconColor: '#FFA726',
            lastUpdated: new Date(),
        };
    }

    public async getHourlyForecast(): Promise<HourlyForecast[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const forecasts: HourlyForecast[] = [];
        const now = new Date();
        const baseTemp = this.getRandomTemp(18, 3);

        const conditions = [
            { en: 'Sunny', ar: 'مشمس', icon: 'mdi-weather-sunny' },
            { en: 'Partly Cloudy', ar: 'غائم جزئياً', icon: 'mdi-weather-partly-cloudy' },
            { en: 'Cloudy', ar: 'غائم', icon: 'mdi-weather-cloudy' },
            { en: 'Rainy', ar: 'ممطر', icon: 'mdi-weather-rainy' },
        ];

        for (let i = 0; i < 24; i++) {
            const hour = new Date(now.getTime() + i * 3600000);
            const conditionIndex = Math.floor(Math.random() * conditions.length);
            const condition = conditions[conditionIndex];

            forecasts.push({
                time: hour.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
                temperature: baseTemp + Math.round(Math.sin(i / 4) * 5),
                condition: condition.en,
                conditionAr: condition.ar,
                icon: condition.icon,
                precipitation: Math.round(Math.random() * 30),
            });
        }

        return forecasts;
    }

    public async getDailyForecast(): Promise<DailyForecast[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const forecasts: DailyForecast[] = [];
        const now = new Date();
        const baseTemp = this.getRandomTemp(18, 3);

        const conditions = [
            { en: 'Sunny', ar: 'مشمس', icon: 'mdi-weather-sunny' },
            { en: 'Partly Cloudy', ar: 'غائم جزئياً', icon: 'mdi-weather-partly-cloudy' },
            { en: 'Cloudy', ar: 'غائم', icon: 'mdi-weather-cloudy' },
            { en: 'Rainy', ar: 'ممطر', icon: 'mdi-weather-rainy' },
            { en: 'Windy', ar: 'عاصف', icon: 'mdi-weather-windy' },
        ];

        for (let i = 0; i < 7; i++) {
            const day = new Date(now.getTime() + i * 86400000);
            const conditionIndex = Math.floor(Math.random() * conditions.length);
            const condition = conditions[conditionIndex];
            const maxTemp = baseTemp + this.getRandomTemp(5, 3);
            const minTemp = maxTemp - this.getRandomTemp(8, 2);

            forecasts.push({
                date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                dateAr: this.getArabicDate(day),
                dayOfWeek: day.toLocaleDateString('en-US', { weekday: 'short' }),
                dayOfWeekAr: this.getArabicDayOfWeek(day.getDay()),
                maxTemp,
                minTemp,
                condition: condition.en,
                conditionAr: condition.ar,
                icon: condition.icon,
                precipitation: Math.round(Math.random() * 40),
                humidity: this.getRandomTemp(50, 15),
            });
        }

        return forecasts;
    }

    public getWeatherAdvice(temp: number, condition: string): string {
        if (temp > 30) {
            return 'الجو حار جداً، احرص على شرب الماء وتجنب التعرض المباشر للشمس';
        } else if (temp < 10) {
            return 'الجو بارد، ارتدِ ملابس دافئة';
        } else if (condition.toLowerCase().includes('rain')) {
            return 'توقعات بهطول أمطار، لا تنسَ حمل المظلة';
        } else if (condition.toLowerCase().includes('cloud')) {
            return 'الجو غائم جزئياً، استمتع بيومك';
        } else {
            return 'الجو معتدل ومناسب للخروج';
        }
    }
}
