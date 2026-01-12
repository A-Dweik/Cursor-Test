import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import CarModel from './CarModel';

@Service()
export default class CarService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration - replace with actual API calls
    private mockCars: CarModel[] = [
        {
            id: '1',
            brand: 'تويوتا',
            model: 'كامري',
            year: 2022,
            price: 85000,
            mileage: 25000,
            color: 'أبيض',
            status: 'available',
            description: 'سيارة في حالة ممتازة، صيانة منتظمة',
            imageUrl: '',
            createdDate: '2024-01-15',
            updatedDate: '2024-01-15',
        },
        {
            id: '2',
            brand: 'هوندا',
            model: 'أكورد',
            year: 2021,
            price: 75000,
            mileage: 35000,
            color: 'فضي',
            status: 'available',
            description: 'سيارة اقتصادية، استهلاك وقود منخفض',
            imageUrl: '',
            createdDate: '2024-01-16',
            updatedDate: '2024-01-16',
        },
        {
            id: '3',
            brand: 'نيسان',
            model: 'التيما',
            year: 2023,
            price: 95000,
            mileage: 10000,
            color: 'أسود',
            status: 'sold',
            description: 'سيارة جديدة، حالة ممتازة',
            imageUrl: '',
            createdDate: '2024-01-17',
            updatedDate: '2024-01-20',
        },
        {
            id: '4',
            brand: 'هيونداي',
            model: 'سوناتا',
            year: 2022,
            price: 70000,
            mileage: 20000,
            color: 'أزرق',
            status: 'reserved',
            description: 'سيارة عائلية مريحة',
            imageUrl: '',
            createdDate: '2024-01-18',
            updatedDate: '2024-01-21',
        },
        {
            id: '5',
            brand: 'كيا',
            model: 'أوبتيما',
            year: 2021,
            price: 65000,
            mileage: 40000,
            color: 'رمادي',
            status: 'available',
            description: 'سيارة موثوقة وعملية',
            imageUrl: '',
            createdDate: '2024-01-19',
            updatedDate: '2024-01-19',
        },
    ];

    public async getAllCars(): Promise<CarModel[]> {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            return this.mockCars;
            
            // Replace with actual API call:
            // const url = 'api/cars';
            // const result = await this.axiosService.axiosInstance.get<CarModel[]>(url);
            // return result.data;
        } catch (exception) {
            console.error('Error fetching cars:', exception);
            return [];
        }
    }

    public async getCarById(id: string): Promise<CarModel | null> {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 300));
            const car = this.mockCars.find((c) => c.id === id);
            return car || null;
            
            // Replace with actual API call:
            // const url = `api/cars/${id}`;
            // const result = await this.axiosService.axiosInstance.get<CarModel>(url);
            // return result.data;
        } catch (exception) {
            console.error('Error fetching car:', exception);
            return null;
        }
    }

    public async addCar(car: CarModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            car.id = (this.mockCars.length + 1).toString();
            car.createdDate = new Date().toISOString();
            car.updatedDate = new Date().toISOString();
            this.mockCars.push(car);
            this.loaderService.HideLoader();
            return true;
            
            // Replace with actual API call:
            // const url = 'api/cars';
            // await this.axiosService.axiosInstance.post(url, car);
            // this.loaderService.HideLoader();
            // return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            console.error('Error adding car:', exception);
            return false;
        }
    }

    public async updateCar(car: CarModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = this.mockCars.findIndex((c) => c.id === car.id);
            if (index !== -1) {
                car.updatedDate = new Date().toISOString();
                this.mockCars[index] = car;
            }
            this.loaderService.HideLoader();
            return true;
            
            // Replace with actual API call:
            // const url = `api/cars/${car.id}`;
            // await this.axiosService.axiosInstance.put(url, car);
            // this.loaderService.HideLoader();
            // return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            console.error('Error updating car:', exception);
            return false;
        }
    }

    public async deleteCar(id: string): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            const index = this.mockCars.findIndex((c) => c.id === id);
            if (index !== -1) {
                this.mockCars.splice(index, 1);
            }
            this.loaderService.HideLoader();
            return true;
            
            // Replace with actual API call:
            // const url = `api/cars/${id}`;
            // await this.axiosService.axiosInstance.delete(url);
            // this.loaderService.HideLoader();
            // return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            console.error('Error deleting car:', exception);
            return false;
        }
    }

    public async searchCars(searchTerm: string): Promise<CarModel[]> {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 300));
            const filteredCars = this.mockCars.filter((car) =>
                car.brand.includes(searchTerm) ||
                car.model.includes(searchTerm) ||
                car.color.includes(searchTerm),
            );
            return filteredCars;
            
            // Replace with actual API call:
            // const url = `api/cars/search?term=${searchTerm}`;
            // const result = await this.axiosService.axiosInstance.get<CarModel[]>(url);
            // return result.data;
        } catch (exception) {
            console.error('Error searching cars:', exception);
            return [];
        }
    }
}
