import { Service, Inject } from 'vue-di-container';
import AxiosService from './AxiosService';
import LoaderService from './LoaderService';
import { HouseModel } from '@/Models/HouseModel';
import { Toaster } from './toast';

@Service()
export default class HouseService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration - in production this would come from API
    private mockHouses: HouseModel[] = [
        {
            id: '1',
            title: 'شقة فاخرة في الرياض',
            description: 'شقة مفروشة بالكامل مع إطلالة رائعة على المدينة. تشمل جميع المرافق الحديثة.',
            location: 'الرياض - حي الملقا',
            price: 3500,
            bedrooms: 3,
            bathrooms: 2,
            area: 150,
            status: 'available',
            ownerName: 'أحمد محمد',
            ownerPhone: '0501234567',
            features: ['مفروش', 'مسبح', 'موقف سيارات', 'أمن 24 ساعة'],
        },
        {
            id: '2',
            title: 'فيلا عصرية في جدة',
            description: 'فيلا واسعة مع حديقة خاصة ومسبح. مثالية للعائلات الكبيرة.',
            location: 'جدة - حي الروضة',
            price: 7000,
            bedrooms: 5,
            bathrooms: 4,
            area: 400,
            status: 'available',
            ownerName: 'خالد علي',
            ownerPhone: '0507654321',
            features: ['حديقة', 'مسبح خاص', 'مجلس خارجي', 'غرفة خادمة'],
        },
        {
            id: '3',
            title: 'دوبلكس في الدمام',
            description: 'دوبلكس حديث في موقع متميز بالقرب من الخدمات.',
            location: 'الدمام - حي الفيصلية',
            price: 4500,
            bedrooms: 4,
            bathrooms: 3,
            area: 250,
            status: 'rented',
            ownerName: 'عبدالله سعد',
            ownerPhone: '0509876543',
            features: ['قريب من المدارس', 'موقف سيارتين', 'مصعد'],
        },
    ];

    public async getAllHouses(): Promise<HouseModel[]> {
        try {
            // this.loaderService.ShowLoader();
            // In production, uncomment this:
            // const result = await this.axiosService.axiosInstance.get<HouseModel[]>('/api/houses');
            // return result.data;

            // For demo purposes, return mock data
            await new Promise(resolve => setTimeout(resolve, 500));
            return [...this.mockHouses];
        } catch (error) {
            Toaster.error('فشل في تحميل العقارات');
            throw error;
        } finally {
            // this.loaderService.HideLoader();
        }
    }

    public async getHouseById(id: string): Promise<HouseModel | null> {
        try {
            // In production:
            // const result = await this.axiosService.axiosInstance.get<HouseModel>(`/api/houses/${id}`);
            // return result.data;

            const house = this.mockHouses.find(h => h.id === id);
            return house || null;
        } catch (error) {
            Toaster.error('فشل في تحميل تفاصيل العقار');
            throw error;
        }
    }

    public async createHouse(house: HouseModel): Promise<HouseModel> {
        try {
            this.loaderService.ShowLoader();
            // In production:
            // const result = await this.axiosService.axiosInstance.post<HouseModel>('/api/houses', house);
            // return result.data;

            const newHouse = {
                ...house,
                id: Date.now().toString(),
                createdDate: new Date(),
            };
            this.mockHouses.push(newHouse);
            Toaster.success('تم إضافة العقار بنجاح', 'نجاح');
            return newHouse;
        } catch (error) {
            Toaster.error('فشل في إضافة العقار');
            throw error;
        } finally {
            this.loaderService.HideLoader();
        }
    }

    public async updateHouse(id: string, house: HouseModel): Promise<HouseModel> {
        try {
            this.loaderService.ShowLoader();
            // In production:
            // const result = await this.axiosService.axiosInstance.put<HouseModel>(`/api/houses/${id}`, house);
            // return result.data;

            const index = this.mockHouses.findIndex(h => h.id === id);
            if (index !== -1) {
                this.mockHouses[index] = { ...house, id };
            }
            Toaster.success('تم تحديث العقار بنجاح', 'نجاح');
            return house;
        } catch (error) {
            Toaster.error('فشل في تحديث العقار');
            throw error;
        } finally {
            this.loaderService.HideLoader();
        }
    }

    public async deleteHouse(id: string): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            // In production:
            // await this.axiosService.axiosInstance.delete(`/api/houses/${id}`);

            const index = this.mockHouses.findIndex(h => h.id === id);
            if (index !== -1) {
                this.mockHouses.splice(index, 1);
            }
            Toaster.success('تم حذف العقار بنجاح', 'نجاح');
        } catch (error) {
            Toaster.error('فشل في حذف العقار');
            throw error;
        } finally {
            this.loaderService.HideLoader();
        }
    }
}
