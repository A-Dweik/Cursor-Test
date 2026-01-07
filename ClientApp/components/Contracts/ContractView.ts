import { Component, Vue } from 'vue-property-decorator';
import WithRender from './ContractView.html';
import { Inject } from 'vue-di-container';
import ContractService from '@/Services/ContractService';
import { ContractModel } from '@/Models/ContractModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class ContractView extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public contract: ContractModel | null = null;
    public loading: boolean = true;
    public deleteDialog: boolean = false;

    public mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.loadContract(id);
        } else {
            this.$router.push({ name: 'contracts' });
        }
    }

    private loadContract(id: string) {
        this.loading = true;
        const contract = this.contractService.getContractById(id);
        
        if (contract) {
            this.contract = contract;
        } else {
            Toaster.error('العقد غير موجود');
            this.$router.push({ name: 'contracts' });
        }
        
        this.loading = false;
    }

    public editContract() {
        if (this.contract) {
            this.$router.push({ name: 'contract-edit', params: { id: this.contract.id } });
        }
    }

    public confirmDelete() {
        this.deleteDialog = true;
    }

    public deleteContract() {
        if (this.contract) {
            const success = this.contractService.deleteContract(this.contract.id);
            if (success) {
                Toaster.success('تم حذف العقد بنجاح');
                this.$router.push({ name: 'contracts' });
            } else {
                Toaster.error('فشل حذف العقد');
            }
        }
        this.deleteDialog = false;
    }

    public backToList() {
        this.$router.push({ name: 'contracts' });
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
        return date.toLocaleDateString('ar-SA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    public formatAmount(amount: number): string {
        return amount.toLocaleString('ar-SA') + ' ريال سعودي';
    }

    public get isRentalContract(): boolean {
        return this.contract ? this.contract.contractType === 'rental' : false;
    }
}
