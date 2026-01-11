import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { Toaster } from './toast';
import { Car } from './CarService';

export interface Rental {
    id: number;
    carId: number;
    car?: Car;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    nationalId: string;
    startDate: string;
    endDate: string;
    totalCost: number;
    status: string;
    notes: string;
    createdDate: string;
}

@Service()
export default class RentalService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getAllRentals(): Promise<Rental[]> {
        try {
            const url = 'api/Rentals';
            const result = await this.axiosService.axiosInstance.get<Rental[]>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return [];
        }
    }

    public async getActiveRentals(): Promise<Rental[]> {
        try {
            const url = 'api/Rentals/active';
            const result = await this.axiosService.axiosInstance.get<Rental[]>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return [];
        }
    }

    public async getRental(id: number): Promise<Rental | null> {
        try {
            const url = `api/Rentals/${id}`;
            const result = await this.axiosService.axiosInstance.get<Rental>(url);
            return result.data;
        } catch (exception) {
            Toaster.error('حدث خطأ أثناء جلب البيانات');
            return null;
        }
    }

    public async createRental(rental: Rental): Promise<Rental | null> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/Rentals';
            const result = await this.axiosService.axiosInstance.post<Rental>(url, rental);
            this.loaderService.HideLoader();
            Toaster.success('تم إنشاء عقد الإيجار بنجاح');
            return result.data;
        } catch (exception: any) {
            this.loaderService.HideLoader();
            if (exception.response && exception.response.status === 409) {
                Toaster.error(exception.response.data);
            } else {
                Toaster.error('حدث خطأ أثناء إنشاء عقد الإيجار');
            }
            return null;
        }
    }

    public async updateRental(id: number, rental: Rental): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Rentals/${id}`;
            await this.axiosService.axiosInstance.put(url, rental);
            this.loaderService.HideLoader();
            Toaster.success('تم تحديث عقد الإيجار بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحديث عقد الإيجار');
            return false;
        }
    }

    public async completeRental(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Rentals/${id}/complete`;
            await this.axiosService.axiosInstance.post(url);
            this.loaderService.HideLoader();
            Toaster.success('تم إكمال عقد الإيجار بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء إكمال عقد الإيجار');
            return false;
        }
    }

    public async cancelRental(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Rentals/${id}/cancel`;
            await this.axiosService.axiosInstance.post(url);
            this.loaderService.HideLoader();
            Toaster.success('تم إلغاء عقد الإيجار بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء إلغاء عقد الإيجار');
            return false;
        }
    }

    public async deleteRental(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/Rentals/${id}`;
            await this.axiosService.axiosInstance.delete(url);
            this.loaderService.HideLoader();
            Toaster.success('تم حذف عقد الإيجار بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء حذف عقد الإيجار');
            return false;
        }
    }
}
