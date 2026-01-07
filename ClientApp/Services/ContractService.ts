import { Service } from 'vue-di-container';
import { ContractModel } from '@/Models/ContractModel';

@Service()
export default class ContractService {
    private contracts: ContractModel[] = [];
    private nextId: number = 1;

    constructor() {
        this.initializeSampleData();
    }

    private initializeSampleData() {
        // Sample data for demonstration
        const sampleContracts: ContractModel[] = [
            {
                id: this.generateId(),
                contractNumber: 'C-2024-001',
                contractDate: '2024-01-15',
                contractType: 'sale',
                assetType: 'car',
                assetName: 'تويوتا كامري 2022',
                assetDetails: 'سيارة تويوتا كامري موديل 2022، لون أبيض، حالة ممتازة',
                firstPartyName: 'أحمد محمد علي',
                firstPartyId: '1234567890',
                firstPartyPhone: '0501234567',
                secondPartyName: 'خالد عبدالله سعيد',
                secondPartyId: '0987654321',
                secondPartyPhone: '0559876543',
                amount: 75000,
                paymentMethod: 'نقدي',
                notes: 'تم الفحص والمعاينة',
                status: 'active',
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            },
            {
                id: this.generateId(),
                contractNumber: 'C-2024-002',
                contractDate: '2024-01-20',
                contractType: 'rental',
                assetType: 'house',
                assetName: 'شقة في حي النرجس',
                assetDetails: 'شقة 3 غرف وصالة، الدور الثاني، مساحة 150 متر',
                firstPartyName: 'فهد سعد المطيري',
                firstPartyId: '1122334455',
                firstPartyPhone: '0551122334',
                secondPartyName: 'عمر يوسف الشمري',
                secondPartyId: '5544332211',
                secondPartyPhone: '0505544332',
                amount: 30000,
                paymentMethod: 'تحويل بنكي',
                duration: 'سنة واحدة',
                startDate: '2024-02-01',
                endDate: '2025-01-31',
                notes: 'يشمل الكهرباء والماء',
                status: 'active',
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            },
            {
                id: this.generateId(),
                contractNumber: 'C-2024-003',
                contractDate: '2024-01-25',
                contractType: 'sale',
                assetType: 'house',
                assetName: 'فيلا في حي الياسمين',
                assetDetails: 'فيلا دورين، 5 غرف، مساحة الأرض 400 متر',
                firstPartyName: 'سلطان عبدالعزيز القحطاني',
                firstPartyId: '2233445566',
                firstPartyPhone: '0502233445',
                secondPartyName: 'ناصر محمد الدوسري',
                secondPartyId: '6655443322',
                secondPartyPhone: '0556655443',
                amount: 1200000,
                paymentMethod: 'تمويل عقاري',
                notes: 'سند ملكية إلكتروني',
                status: 'active',
                createdDate: new Date().toISOString(),
                updatedDate: new Date().toISOString(),
            },
        ];

        this.contracts = sampleContracts;
        this.nextId = sampleContracts.length + 1;
    }

    private generateId(): string {
        return `contract-${this.nextId++}`;
    }

    public getAllContracts(): ContractModel[] {
        return [...this.contracts];
    }

    public getContractById(id: string): ContractModel | undefined {
        return this.contracts.find(c => c.id === id);
    }

    public addContract(contract: Omit<ContractModel, 'id' | 'createdDate' | 'updatedDate'>): ContractModel {
        const newContract: ContractModel = {
            ...contract,
            id: this.generateId(),
            createdDate: new Date().toISOString(),
            updatedDate: new Date().toISOString(),
        };

        this.contracts.unshift(newContract);
        return newContract;
    }

    public updateContract(id: string, updates: Partial<ContractModel>): ContractModel | undefined {
        const index = this.contracts.findIndex(c => c.id === id);
        
        if (index === -1) {
            return undefined;
        }

        this.contracts[index] = {
            ...this.contracts[index],
            ...updates,
            id: this.contracts[index].id,
            createdDate: this.contracts[index].createdDate,
            updatedDate: new Date().toISOString(),
        };

        return this.contracts[index];
    }

    public deleteContract(id: string): boolean {
        const index = this.contracts.findIndex(c => c.id === id);
        
        if (index === -1) {
            return false;
        }

        this.contracts.splice(index, 1);
        return true;
    }

    public searchContracts(query: string): ContractModel[] {
        const lowerQuery = query.toLowerCase();
        
        return this.contracts.filter(contract => 
            contract.contractNumber.toLowerCase().includes(lowerQuery) ||
            contract.assetName.toLowerCase().includes(lowerQuery) ||
            contract.firstPartyName.toLowerCase().includes(lowerQuery) ||
            contract.secondPartyName.toLowerCase().includes(lowerQuery) ||
            contract.assetDetails.toLowerCase().includes(lowerQuery)
        );
    }

    public filterContracts(filters: {
        contractType?: string;
        assetType?: string;
        status?: string;
    }): ContractModel[] {
        return this.contracts.filter(contract => {
            if (filters.contractType && contract.contractType !== filters.contractType) {
                return false;
            }
            if (filters.assetType && contract.assetType !== filters.assetType) {
                return false;
            }
            if (filters.status && contract.status !== filters.status) {
                return false;
            }
            return true;
        });
    }

    public generateContractNumber(): string {
        const year = new Date().getFullYear();
        const count = this.contracts.length + 1;
        return `C-${year}-${count.toString().padStart(3, '0')}`;
    }
}
