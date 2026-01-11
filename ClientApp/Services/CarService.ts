import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { Toaster } from './toast';

export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    plateNumber: string;
    dailyRate: number;
    isAvailable: boolean;
    description: string;
    fuelType: string;
    seats: number;
    transmission: string;
}

@Service()
export default class CarService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getAllCars(): Promise<Car[]> {
        try {
            const url = 'api/Cars';
            const result = await this.axiosService.axiosInstance.get<Car[]>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return [];
        }
    }

    public async getAvailableCars(): Promise<Car[]> {
        try {
            const url = 'api/Cars/available';
            const result = await this.axiosService.axiosInstance.get<Car[]>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return [];
        }
    }

    public async getCar(id: number): Promise<Car | null> {
        try {
            const url = `api/Cars/${id}`;
            const result = await this.axiosService.axiosInstance.get<Car>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return null;
        }
    }

    public async createCar(car: Car): Promise<Car | null> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/Cars';
            const result = await this.axiosService.axiosInstance.post<Car>(url, car);
            this.loaderService.HideLoader();
            Toaster.success('تم إضافة السيارة بنجاح');
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء إضافة السيارة');
            return null;
        }
    }

    public async updateCar(id: number, car: Car): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Cars/${id}`;
            await this.axiosService.axiosInstance.put(url, car);
            this.loaderService.HideLoader();
            Toaster.success('تم تحديث السيارة بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحديث السيارة');
            return false;
        }
    }

    public async deleteCar(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Cars/${id}`;
            await this.axiosService.axiosInstance.delete(url);
            this.loaderService.HideLoader();
            Toaster.success('تم حذف السيارة بنجاح');
            return true;
        } catch (exception: any) {
            this.loaderService.HideLoader();
            if (exception.response && exception.response.status === 409) {
                Toaster.error(exception.response.data);
            } else {
                Toaster.error('حدث خطأ أثناء حذف السيارة');
            }
            return false;
        }
    }
}
