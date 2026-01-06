import { Service, Inject } from 'vue-di-container';
import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import ContractModel, { ContractType, ContractCategory, ContractStatus } from './Models/ContractModel';
import { Toaster } from '@/Services/toast';

@Service()
export default class ContractService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    private contracts: ContractModel[] = [];

    constructor() {
        this.loadMockData();
    }

    private loadMockData(): void {
        this.contracts = [
            {
                id: '1',
                contractNumber: 'RE-2025-001',
                contractType: ContractType.RealEstate,
                contractCategory: ContractCategory.Sale,
                partyAName: 'أحمد محمد السعيد',
                partyAId: '1234567890',
                partyBName: 'فاطمة علي الأحمد',
                partyBId: '0987654321',
                propertyDescription: 'منزل سكني - 300 متر مربع - حي النخيل',
                propertyValue: 500000,
                contractDate: '2025-01-01',
                status: ContractStatus.Verified,
                notes: 'تم التوثيق بنجاح',
                createdDate: '2025-01-01T10:00:00',
                verificationDate: '2025-01-02T14:30:00'
            },
            {
                id: '2',
                contractNumber: 'VH-2025-002',
                contractType: ContractType.Vehicle,
                contractCategory: ContractCategory.Sale,
                partyAName: 'محمد عبدالله القحطاني',
                partyAId: '1122334455',
                partyBName: 'سعد فهد المطيري',
                partyBId: '5544332211',
                propertyDescription: 'تويوتا كامري 2023 - أبيض - لوحة: ABC 1234',
                propertyValue: 85000,
                contractDate: '2025-01-05',
                status: ContractStatus.Pending,
                notes: 'في انتظار التوثيق',
                createdDate: '2025-01-05T09:15:00'
            },
            {
                id: '3',
                contractNumber: 'CM-2025-003',
                contractType: ContractType.Commercial,
                contractCategory: ContractCategory.Lease,
                partyAName: 'شركة الأعمال المتقدمة',
                partyAId: '7001234567',
                partyBName: 'مؤسسة التجارة الحديثة',
                partyBId: '7009876543',
                propertyDescription: 'محل تجاري - شارع الملك فهد - 100 متر مربع',
                propertyValue: 120000,
                contractDate: '2025-01-03',
                status: ContractStatus.Verified,
                notes: 'عقد إيجار لمدة سنة واحدة',
                createdDate: '2025-01-03T11:00:00',
                verificationDate: '2025-01-04T16:00:00'
            }
        ];
    }

    public async getAllContracts(): Promise<ContractModel[]> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 500));
            this.loaderService.HideLoader();
            return this.contracts;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحميل العقود');
            return [];
        }
    }

    public async getContractById(id: string): Promise<ContractModel | null> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 300));
            const contract = this.contracts.find(c => c.id === id);
            this.loaderService.HideLoader();
            return contract || null;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحميل العقد');
            return null;
        }
    }

    public async createContract(contract: ContractModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            contract.id = (this.contracts.length + 1).toString();
            contract.createdDate = new Date().toISOString();
            contract.status = ContractStatus.Pending;
            
            this.contracts.push(contract);
            
            this.loaderService.HideLoader();
            Toaster.success('تم إضافة العقد بنجاح');
            return true;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء إضافة العقد');
            return false;
        }
    }

    public async updateContract(contract: ContractModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const index = this.contracts.findIndex(c => c.id === contract.id);
            if (index !== -1) {
                this.contracts[index] = contract;
                this.loaderService.HideLoader();
                Toaster.success('تم تحديث العقد بنجاح');
                return true;
            }
            
            this.loaderService.HideLoader();
            Toaster.error('العقد غير موجود');
            return false;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء تحديث العقد');
            return false;
        }
    }

    public async verifyContract(id: string): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const contract = this.contracts.find(c => c.id === id);
            if (contract) {
                contract.status = ContractStatus.Verified;
                contract.verificationDate = new Date().toISOString();
                this.loaderService.HideLoader();
                Toaster.success('تم توثيق العقد بنجاح');
                return true;
            }
            
            this.loaderService.HideLoader();
            Toaster.error('العقد غير موجود');
            return false;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء توثيق العقد');
            return false;
        }
    }

    public async deleteContract(id: string): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const index = this.contracts.findIndex(c => c.id === id);
            if (index !== -1) {
                this.contracts.splice(index, 1);
                this.loaderService.HideLoader();
                Toaster.success('تم حذف العقد بنجاح');
                return true;
            }
            
            this.loaderService.HideLoader();
            Toaster.error('العقد غير موجود');
            return false;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء حذف العقد');
            return false;
        }
    }

    public getContractTypeText(type: ContractType): string {
        switch (type) {
            case ContractType.RealEstate: return 'عقار';
            case ContractType.Vehicle: return 'مركبة';
            case ContractType.Commercial: return 'تجاري';
            default: return type;
        }
    }

    public getContractCategoryText(category: ContractCategory): string {
        switch (category) {
            case ContractCategory.Sale: return 'بيع';
            case ContractCategory.Purchase: return 'شراء';
            case ContractCategory.Rent: return 'إيجار';
            case ContractCategory.Lease: return 'تأجير';
            default: return category;
        }
    }

    public getStatusText(status: ContractStatus): string {
        switch (status) {
            case ContractStatus.Pending: return 'قيد المراجعة';
            case ContractStatus.Verified: return 'موثق';
            case ContractStatus.Rejected: return 'مرفوض';
            default: return status;
        }
    }

    public getStatusClasses(status: ContractStatus): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case ContractStatus.Verified: return `${baseClasses} status--green`;
            case ContractStatus.Pending: return `${baseClasses} status--orange`;
            case ContractStatus.Rejected: return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }
}
