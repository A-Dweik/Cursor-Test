import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './ContractList.html';
import ContractService from '@/Services/Contract/ContractService';
import ContractModel, { ContractType, ContractStatus } from '@/Services/Contract/Models/ContractModel';

@WithRender
@Component({})
export default class ContractList extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public contracts: ContractModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public filterType: string = 'all';
    public filterStatus: string = 'all';
    public showDeleteDialog: boolean = false;
    public contractToDelete: ContractModel | null = null;

    public typeOptions = [
        { value: 'all', text: 'جميع الأنواع' },
        { value: ContractType.RealEstate, text: 'عقار' },
        { value: ContractType.Vehicle, text: 'مركبة' },
        { value: ContractType.Commercial, text: 'تجاري' }
    ];

    public statusOptions = [
        { value: 'all', text: 'جميع الحالات' },
        { value: ContractStatus.Pending, text: 'قيد المراجعة' },
        { value: ContractStatus.Verified, text: 'موثق' },
        { value: ContractStatus.Rejected, text: 'مرفوض' }
    ];

    public async mounted() {
        await this.loadContracts();
    }

    public async loadContracts() {
        this.loading = true;
        this.contracts = await this.contractService.getAllContracts();
        this.loading = false;
    }

    public get filteredContracts(): ContractModel[] {
        return this.contracts.filter(contract => {
            const matchesSearch = !this.searchQuery || 
                contract.contractNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                contract.partyAName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                contract.partyBName.toLowerCase().includes(this.searchQuery.toLowerCase());

            const matchesType = this.filterType === 'all' || contract.contractType === this.filterType;
            const matchesStatus = this.filterStatus === 'all' || contract.status === this.filterStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }

    public getStatusClasses(status: ContractStatus): string {
        return this.contractService.getStatusClasses(status);
    }

    public getStatusText(status: ContractStatus): string {
        return this.contractService.getStatusText(status);
    }

    public getContractTypeText(type: ContractType): string {
        return this.contractService.getContractTypeText(type);
    }

    public getContractCategoryText(category: any): string {
        return this.contractService.getContractCategoryText(category);
    }

    public getTypeIcon(type: ContractType): string {
        switch (type) {
            case ContractType.RealEstate: return 'mdi-home';
            case ContractType.Vehicle: return 'mdi-car';
            case ContractType.Commercial: return 'mdi-briefcase';
            default: return 'mdi-file-document';
        }
    }

    public viewContract(contract: ContractModel) {
        this.$router.push(`/contracts/${contract.id}`);
    }

    public editContract(contract: ContractModel) {
        this.$router.push(`/contracts/edit/${contract.id}`);
    }

    public async verifyContract(contract: ContractModel) {
        const success = await this.contractService.verifyContract(contract.id);
        if (success) {
            await this.loadContracts();
        }
    }

    public confirmDelete(contract: ContractModel) {
        this.contractToDelete = contract;
        this.showDeleteDialog = true;
    }

    public async deleteContract() {
        if (this.contractToDelete) {
            const success = await this.contractService.deleteContract(this.contractToDelete.id);
            if (success) {
                await this.loadContracts();
            }
        }
        this.showDeleteDialog = false;
        this.contractToDelete = null;
    }

    public addNewContract() {
        this.$router.push('/contracts/new');
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }

    public formatCurrency(value: number): string {
        return value.toLocaleString('ar-SA') + ' ريال';
    }
}
