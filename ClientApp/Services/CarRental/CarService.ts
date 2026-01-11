import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';

export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    dailyRate: number;
    isAvailable: boolean;
    imageUrl: string;
    description: string;
    createdAt: string;
}

@Service()
export default class CarService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getAllCars(): Promise<Car[]> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Car[]>('api/Cars');
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getAvailableCars(): Promise<Car[]> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Car[]>('api/Cars/Available');
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getCar(id: number): Promise<Car | null> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Car>(`api/Cars/${id}`);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return null;
        }
    }

    public async addCar(car: Car): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.post('api/Cars', car);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async updateCar(car: Car): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.put(`api/Cars/${car.id}`, car);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async deleteCar(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.delete(`api/Cars/${id}`);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }
}
