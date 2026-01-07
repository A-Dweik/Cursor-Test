import { Component, Vue } from 'vue-property-decorator';
import WithRender from './ContractsList.html';
import { Inject } from 'vue-di-container';
import ContractService from '@/Services/ContractService';
import { ContractModel } from '@/Models/ContractModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class ContractsList extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public contracts: ContractModel[] = [];
    public filteredContracts: ContractModel[] = [];
    public searchQuery: string = '';
    public loading: boolean = false;
    public selectedContractType: string = 'all';
    public selectedAssetType: string = 'all';
    public selectedStatus: string = 'all';
    public deleteDialog: boolean = false;
    public contractToDelete: ContractModel | null = null;

    public headers = [
        { text: 'رقم العقد', value: 'contractNumber', sortable: true },
        { text: 'نوع العقد', value: 'contractType', sortable: true },
        { text: 'نوع الأصل', value: 'assetType', sortable: true },
        { text: 'اسم الأصل', value: 'assetName', sortable: true },
        { text: 'الطرف الأول', value: 'firstPartyName', sortable: true },
        { text: 'الطرف الثاني', value: 'secondPartyName', sortable: true },
        { text: 'المبلغ', value: 'amount', sortable: true },
        { text: 'التاريخ', value: 'contractDate', sortable: true },
        { text: 'الحالة', value: 'status', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false },
    ];

    public mounted() {
        this.loadContracts();
    }

    private loadContracts() {
        this.loading = true;
        this.contracts = this.contractService.getAllContracts();
        this.applyFilters();
        this.loading = false;
    }

    public search() {
        if (this.searchQuery.trim() === '') {
            this.applyFilters();
        } else {
            this.filteredContracts = this.contractService.searchContracts(this.searchQuery);
        }
    }

    public applyFilters() {
        const filters: any = {};
        
        if (this.selectedContractType !== 'all') {
            filters.contractType = this.selectedContractType;
        }
        
        if (this.selectedAssetType !== 'all') {
            filters.assetType = this.selectedAssetType;
        }
        
        if (this.selectedStatus !== 'all') {
            filters.status = this.selectedStatus;
        }

        if (Object.keys(filters).length === 0) {
            this.filteredContracts = [...this.contracts];
        } else {
            this.filteredContracts = this.contractService.filterContracts(filters);
        }
    }

    public clearFilters() {
        this.searchQuery = '';
        this.selectedContractType = 'all';
        this.selectedAssetType = 'all';
        this.selectedStatus = 'all';
        this.applyFilters();
    }

    public viewContract(contract: ContractModel) {
        this.$router.push({ name: 'contract-view', params: { id: contract.id } });
    }

    public editContract(contract: ContractModel) {
        this.$router.push({ name: 'contract-edit', params: { id: contract.id } });
    }

    public confirmDelete(contract: ContractModel) {
        this.contractToDelete = contract;
        this.deleteDialog = true;
    }

    public deleteContract() {
        if (this.contractToDelete) {
            const success = this.contractService.deleteContract(this.contractToDelete.id);
            if (success) {
                Toaster.success('تم حذف العقد بنجاح');
                this.loadContracts();
            } else {
                Toaster.error('فشل حذف العقد');
            }
        }
        this.deleteDialog = false;
        this.contractToDelete = null;
    }

    public addNewContract() {
        this.$router.push({ name: 'contract-add' });
    }

    public getContractTypeText(type: string): string {
        return type === 'sale' ? 'بيع' : 'تأجير';
    }

    public getAssetTypeText(type: string): string {
        return type === 'car' ? 'سيارة' : 'منزل';
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'active': return 'نشط';
            case 'completed': return 'مكتمل';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    }

    public getStatusClass(status: string): string {
        switch (status) {
            case 'active': return 'status--text status--rounded status--green';
            case 'completed': return 'status--text status--rounded status--blue';
            case 'cancelled': return 'status--text status--rounded status--red';
            default: return 'status--text status--rounded';
        }
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }

    public formatAmount(amount: number): string {
        return amount.toLocaleString('ar-SA') + ' ريال';
    }
}
