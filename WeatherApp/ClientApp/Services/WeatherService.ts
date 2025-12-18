import { Inject, Service } from 'vue-di-container';
import AxiosService from './AxiosService';
import LoaderService from './LoaderService';

export interface WeatherViewModel {
    city: string;
    temperatureC: number;
    condition: string;
    humidity: number;
    windSpeedKph: number;
    lastUpdated: string;
}

@Service()
export default class WeatherService {
    @Inject(AxiosService) private axiosService!: AxiosService;
    @Inject(LoaderService) private loaderService!: LoaderService;

    public async getTodayWeather(): Promise<WeatherViewModel | null> {
        try {
            this.loaderService.ShowLoader();
            const response = await this.axiosService.axiosInstance.get<WeatherViewModel>('api/weather/today');
            return response.data;
        } catch (error) {
            return null;
        } finally {
            this.loaderService.HideLoader();
        }
    }
}
