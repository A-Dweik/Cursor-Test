import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import LandModel from './LandModel';
import { Toaster } from '../toast';

@Service()
export default class LandService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration (in production, replace with API calls)
    private mockLands: LandModel[] = [
        {
            id: '1',
            title: 'أرض زراعية في الخرج',
            description: 'أرض زراعية خصبة بمساحة كبيرة، مناسبة للمشاريع الزراعية والاستثمار',
            location: 'الخرج، حي السيح',
            city: 'الخرج',
            area: 10000,
            pricePerMonth: 15000,
            status: 'available',
            ownerName: 'أحمد محمد العلي',
            ownerPhone: '+966501234567',
            ownerEmail: 'ahmed@example.com',
            features: ['مياه', 'كهرباء', 'سور', 'طريق معبد'],
            images: [],
            createdDate: '2024-01-15',
            updatedDate: '2024-01-15',
        },
        {
            id: '2',
            title: 'أرض تجارية في الرياض',
            description: 'أرض تجارية على شارع رئيسي، مناسبة للاستثمار التجاري',
            location: 'الرياض، حي النخيل',
            city: 'الرياض',
            area: 5000,
            pricePerMonth: 30000,
            status: 'available',
            ownerName: 'محمد سعد الشمري',
            ownerPhone: '+966502345678',
            ownerEmail: 'mohammed@example.com',
            features: ['موقع استراتيجي', 'شارع تجاري', 'كهرباء', 'صرف صحي'],
            images: [],
            createdDate: '2024-01-20',
            updatedDate: '2024-01-20',
        },
        {
            id: '3',
            title: 'أرض سكنية في جدة',
            description: 'أرض سكنية في موقع متميز، قريبة من الخدمات',
            location: 'جدة، حي الروضة',
            city: 'جدة',
            area: 800,
            pricePerMonth: 8000,
            status: 'rented',
            ownerName: 'فهد عبدالله القحطاني',
            ownerPhone: '+966503456789',
            ownerEmail: 'fahad@example.com',
            features: ['قريب من المدارس', 'كهرباء', 'ماء', 'صرف صحي'],
            images: [],
            createdDate: '2024-01-10',
            updatedDate: '2024-01-25',
        },
    ];

    public async getAllLands(): Promise<LandModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(1000);
            this.loaderService.HideLoader();
            return this.mockLands;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحميل البيانات');
            return [];
        }
    }

    public async getLandById(id: string): Promise<LandModel | null> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(500);
            const land = this.mockLands.find(l => l.id === id) || null;
            this.loaderService.HideLoader();
            return land;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحميل البيانات');
            return null;
        }
    }

    public async addLand(land: LandModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(1000);
            land.id = (this.mockLands.length + 1).toString();
            land.createdDate = new Date().toISOString().split('T')[0];
            land.updatedDate = new Date().toISOString().split('T')[0];
            this.mockLands.push(land);
            this.loaderService.HideLoader();
            Toaster.success('تم إضافة الأرض بنجاح');
            return true;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء إضافة الأرض');
            return false;
        }
    }

    public async updateLand(land: LandModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(1000);
            const index = this.mockLands.findIndex(l => l.id === land.id);
            if (index !== -1) {
                land.updatedDate = new Date().toISOString().split('T')[0];
                this.mockLands[index] = land;
                this.loaderService.HideLoader();
                Toaster.success('تم تحديث الأرض بنجاح');
                return true;
            }
            this.loaderService.HideLoader();
            Toaster.error('الأرض غير موجودة');
            return false;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحديث الأرض');
            return false;
        }
    }

    public async deleteLand(id: string): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(1000);
            const index = this.mockLands.findIndex(l => l.id === id);
            if (index !== -1) {
                this.mockLands.splice(index, 1);
                this.loaderService.HideLoader();
                Toaster.success('تم حذف الأرض بنجاح');
                return true;
            }
            this.loaderService.HideLoader();
            Toaster.error('الأرض غير موجودة');
            return false;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء حذف الأرض');
            return false;
        }
    }

    public async searchLands(query: string): Promise<LandModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(500);
            const results = this.mockLands.filter(land =>
                land.title.includes(query) ||
                land.description.includes(query) ||
                land.location.includes(query) ||
                land.city.includes(query)
            );
            this.loaderService.HideLoader();
            return results;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء البحث');
            return [];
        }
    }

    public async filterLands(filters: { status?: string; city?: string; minArea?: number; maxArea?: number; minPrice?: number; maxPrice?: number }): Promise<LandModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(500);
            let results = this.mockLands;

            if (filters.status) {
                results = results.filter(land => land.status === filters.status);
            }
            if (filters.city) {
                results = results.filter(land => land.city === filters.city);
            }
            if (filters.minArea) {
                results = results.filter(land => land.area >= filters.minArea);
            }
            if (filters.maxArea) {
                results = results.filter(land => land.area <= filters.maxArea);
            }
            if (filters.minPrice) {
                results = results.filter(land => land.pricePerMonth >= filters.minPrice);
            }
            if (filters.maxPrice) {
                results = results.filter(land => land.pricePerMonth <= filters.maxPrice);
            }

            this.loaderService.HideLoader();
            return results;
        } catch (exception) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء التصفية');
            return [];
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
