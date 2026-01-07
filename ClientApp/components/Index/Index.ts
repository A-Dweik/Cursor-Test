import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import ContractService from '@/Services/ContractService';
import { ContractModel } from '@/Models/ContractModel';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public totalContracts: number = 0;
    public saleContracts: number = 0;
    public rentalContracts: number = 0;
    public carContracts: number = 0;
    public houseContracts: number = 0;
    public recentContracts: ContractModel[] = [];
    public loading: boolean = true;

    public mounted() {
        this.loadDashboardData();
    }

    private loadDashboardData() {
        this.loading = true;
        
        const allContracts = this.contractService.getAllContracts();
        this.totalContracts = allContracts.length;
        
        this.saleContracts = allContracts.filter(c => c.contractType === 'sale').length;
        this.rentalContracts = allContracts.filter(c => c.contractType === 'rental').length;
        
        this.carContracts = allContracts.filter(c => c.assetType === 'car').length;
        this.houseContracts = allContracts.filter(c => c.assetType === 'house').length;
        
        this.recentContracts = allContracts.slice(0, 5);
        
        this.loading = false;
    }

    public navigateToContracts() {
        this.$router.push({ name: 'contracts' });
    }

    public navigateToAddContract() {
        this.$router.push({ name: 'contract-add' });
    }

    public viewContract(contract: ContractModel) {
        this.$router.push({ name: 'contract-view', params: { id: contract.id } });
    }

    public getContractTypeText(type: string): string {
        return type === 'sale' ? 'بيع' : 'تأجير';
    }

    public getAssetTypeText(type: string): string {
        return type === 'car' ? 'سيارة' : 'منزل';
    }

    public getContractTypeIcon(type: string): string {
        return type === 'sale' ? 'mdi-cash' : 'mdi-home-currency-usd';
    }

    public getAssetTypeIcon(type: string): string {
        return type === 'car' ? 'mdi-car' : 'mdi-home';
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }
}
