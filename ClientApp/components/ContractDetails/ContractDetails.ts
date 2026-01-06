import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './ContractDetails.html';
import ContractService from '@/Services/Contract/ContractService';
import ContractModel, { ContractType, ContractStatus } from '@/Services/Contract/Models/ContractModel';

@WithRender
@Component({})
export default class ContractDetails extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public contract: ContractModel | null = null;
    public loading: boolean = false;

    public async mounted() {
        const contractId = this.$route.params.id;
        if (contractId) {
            await this.loadContract(contractId);
        }
    }

    public async loadContract(id: string) {
        this.loading = true;
        this.contract = await this.contractService.getContractById(id);
        this.loading = false;

        if (!this.contract) {
            this.$router.push('/contracts');
        }
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

    public goBack() {
        this.$router.push('/contracts');
    }

    public editContract() {
        if (this.contract) {
            this.$router.push(`/contracts/edit/${this.contract.id}`);
        }
    }

    public async verifyContract() {
        if (this.contract) {
            const success = await this.contractService.verifyContract(this.contract.id);
            if (success) {
                await this.loadContract(this.contract.id);
            }
        }
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    public formatDateTime(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    public formatCurrency(value: number): string {
        return value.toLocaleString('ar-SA') + ' ريال سعودي';
    }
}
