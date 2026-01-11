import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { Car } from './CarService';

export interface Rental {
    id: number;
    carId: number;
    car?: Car;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerIdNumber: string;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: string;
    notes: string;
    createdAt: string;
}

@Service()
export default class RentalService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getAllRentals(): Promise<Rental[]> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Rental[]>('api/Rentals');
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getActiveRentals(): Promise<Rental[]> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Rental[]>('api/Rentals/Active');
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async getRental(id: number): Promise<Rental | null> {
        try {
            this.loaderService.ShowLoader();
            const result = await this.axiosService.axiosInstance.get<Rental>(`api/Rentals/${id}`);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            return null;
        }
    }

    public async addRental(rental: Rental): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.post('api/Rentals', rental);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async completeRental(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.post(`api/Rentals/${id}/Complete`);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async deleteRental(id: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await this.axiosService.axiosInstance.delete(`api/Rentals/${id}`);
            this.loaderService.HideLoader();
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }
}
