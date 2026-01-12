import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import LandModel from './Models/LandModel';

@Service()
export default class LandService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration - in real app, this would be API calls
    private mockLands: LandModel[] = [
        {
            id: '1',
            title: 'أرض سكنية في حي النرجس',
            description: 'أرض سكنية ممتازة في موقع استراتيجي بمساحة كبيرة',
            area: 500,
            price: 1500000,
            location: 'حي النرجس، شمال الرياض',
            city: 'الرياض',
            district: 'النرجس',
            latitude: 24.7136,
            longitude: 46.6753,
            status: 'available',
            ownerName: 'أحمد محمد',
            ownerPhone: '0501234567',
            deedNumber: 'D-2024-001',
            planNumber: 'P-2024-001',
            landType: 'residential',
            hasElectricity: true,
            hasWater: true,
            hasRoads: true,
            images: [],
            documents: [],
            createdDate: '2024-01-15',
            verificationStatus: 'verified',
            notes: 'أرض في موقع ممتاز قريبة من الخدمات'
        },
        {
            id: '2',
            title: 'أرض تجارية على طريق الملك فهد',
            description: 'أرض تجارية على شارع رئيسي بواجهة كبيرة',
            area: 1000,
            price: 5000000,
            location: 'طريق الملك فهد، جدة',
            city: 'جدة',
            district: 'الروضة',
            status: 'available',
            ownerName: 'خالد عبدالله',
            ownerPhone: '0509876543',
            landType: 'commercial',
            hasElectricity: true,
            hasWater: true,
            hasRoads: true,
            images: [],
            documents: [],
            createdDate: '2024-01-10',
            verificationStatus: 'verified'
        },
        {
            id: '3',
            title: 'أرض زراعية في الخرج',
            description: 'أرض زراعية خصبة مع بئر ماء',
            area: 5000,
            price: 2000000,
            location: 'الخرج',
            city: 'الرياض',
            district: 'الخرج',
            status: 'pending',
            ownerName: 'سعد الدوسري',
            ownerPhone: '0551234567',
            landType: 'agricultural',
            hasElectricity: false,
            hasWater: true,
            hasRoads: true,
            images: [],
            documents: [],
            createdDate: '2024-01-20',
            verificationStatus: 'pending'
        }
    ];

    public async getAllLands(): Promise<LandModel[]> {
        try {
            this.loaderService.ShowLoader();
            // Simulate API call
            await this.delay(1000);
            this.loaderService.HideLoader();
            return [...this.mockLands];
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async getLandById(id: string): Promise<LandModel | null> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(500);
            this.loaderService.HideLoader();
            const land = this.mockLands.find(l => l.id === id);
            return land || null;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async createLand(land: LandModel): Promise<LandModel> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(800);
            const newLand = {
                ...land,
                id: (this.mockLands.length + 1).toString(),
                createdDate: new Date().toISOString().split('T')[0],
                status: 'available' as const,
                verificationStatus: 'pending' as const,
            };
            this.mockLands.push(newLand);
            this.loaderService.HideLoader();
            return newLand;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async updateLand(id: string, land: LandModel): Promise<LandModel> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(800);
            const index = this.mockLands.findIndex(l => l.id === id);
            if (index !== -1) {
                this.mockLands[index] = {
                    ...land,
                    id,
                    updatedDate: new Date().toISOString().split('T')[0],
                };
                this.loaderService.HideLoader();
                return this.mockLands[index];
            }
            this.loaderService.HideLoader();
            throw new Error('Land not found');
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async deleteLand(id: string): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(500);
            const index = this.mockLands.findIndex(l => l.id === id);
            if (index !== -1) {
                this.mockLands.splice(index, 1);
            }
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async verifyLand(id: string, status: 'verified' | 'rejected'): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(500);
            const land = this.mockLands.find(l => l.id === id);
            if (land) {
                land.verificationStatus = status;
            }
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async updateLandStatus(id: string, status: LandModel['status']): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            await this.delay(500);
            const land = this.mockLands.find(l => l.id === id);
            if (land) {
                land.status = status;
            }
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
