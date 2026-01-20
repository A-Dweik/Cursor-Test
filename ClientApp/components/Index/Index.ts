import { Component, Vue } from 'vue-property-decorator';
import WithRender from './IndexPage.html';

interface Contract {
    id: string;
    propertyAddress: string;
    sellerName: string;
    buyerName: string;
    price: number;
    contractDate: string;
    status: 'pending' | 'verified' | 'rejected';
    propertyType: string;
}

@WithRender
@Component({
    components: {},
})
export default class Index extends Vue {
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedStatus: string = 'all';
    public contracts: Contract[] = [];
    public filteredContracts: Contract[] = [];

    mounted() {
        this.loadContracts();
    }

    private loadContracts() {
        // Mock data - in real app, fetch from API
        this.contracts = [
            {
                id: 'CT-2024-001',
                propertyAddress: 'حي النخيل، شارع الملك فهد، الرياض',
                sellerName: 'أحمد محمد العتيبي',
                buyerName: 'خالد سعد الغامدي',
                price: 850000,
                contractDate: '2024-01-15',
                status: 'pending',
                propertyType: 'فيلا سكنية',
            },
            {
                id: 'CT-2024-002',
                propertyAddress: 'حي الروضة، شارع العليا، جدة',
                sellerName: 'فاطمة عبدالله القحطاني',
                buyerName: 'محمد علي الشهري',
                price: 650000,
                contractDate: '2024-01-18',
                status: 'verified',
                propertyType: 'شقة سكنية',
            },
            {
                id: 'CT-2024-003',
                propertyAddress: 'حي الفيصلية، طريق الملك عبدالعزيز، الدمام',
                sellerName: 'سعيد راشد الدوسري',
                buyerName: 'عبدالرحمن يوسف المالكي',
                price: 720000,
                contractDate: '2024-01-20',
                status: 'pending',
                propertyType: 'دوبلكس',
            },
            {
                id: 'CT-2024-004',
                propertyAddress: 'حي المرجان، شارع الأمير سلطان، مكة المكرمة',
                sellerName: 'نورة فهد الحربي',
                buyerName: 'سلمان عبدالله الزهراني',
                price: 920000,
                contractDate: '2024-01-12',
                status: 'rejected',
                propertyType: 'فيلا مع ملحق',
            },
            {
                id: 'CT-2024-005',
                propertyAddress: 'حي السلامة، شارع التحلية، الطائف',
                sellerName: 'عبدالله حسن البلوي',
                buyerName: 'سارة محمد العمري',
                price: 580000,
                contractDate: '2024-01-22',
                status: 'pending',
                propertyType: 'شقة دور أرضي',
            },
        ];

        this.filteredContracts = [...this.contracts];
    }

    public filterByStatus(status: string) {
        this.selectedStatus = status;
        this.applyFilters();
    }

    public searchContracts() {
        this.applyFilters();
    }

    private applyFilters() {
        let filtered = [...this.contracts];

        // Filter by status
        if (this.selectedStatus !== 'all') {
            filtered = filtered.filter((c) => c.status === this.selectedStatus);
        }

        // Filter by search query
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (c) =>
                    c.id.toLowerCase().includes(query) ||
                    c.propertyAddress.includes(this.searchQuery) ||
                    c.sellerName.includes(this.searchQuery) ||
                    c.buyerName.includes(this.searchQuery) ||
                    c.propertyType.includes(this.searchQuery),
            );
        }

        this.filteredContracts = filtered;
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'pending':
                return 'قيد المراجعة';
            case 'verified':
                return 'موثق';
            case 'rejected':
                return 'مرفوض';
            default:
                return status;
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'verified':
                return `${baseClasses} status--green`;
            case 'pending':
                return `${baseClasses} status--orange`;
            case 'rejected':
                return `${baseClasses} status--red`;
            default:
                return baseClasses;
        }
    }

    public formatPrice(price: number): string {
        return price.toLocaleString('ar-SA') + ' ريال';
    }

    public viewContract(contract: Contract) {
        // Navigate to contract details or open dialog
        alert(`عرض تفاصيل العقد: ${contract.id}`);
    }

    public verifyContract(contract: Contract) {
        // Open verification dialog or navigate to verification page
        contract.status = 'verified';
        this.applyFilters();
    }

    public rejectContract(contract: Contract) {
        // Open rejection dialog with reason
        contract.status = 'rejected';
        this.applyFilters();
    }

    public get pendingCount(): number {
        return this.contracts.filter((c) => c.status === 'pending').length;
    }

    public get verifiedCount(): number {
        return this.contracts.filter((c) => c.status === 'verified').length;
    }

    public get rejectedCount(): number {
        return this.contracts.filter((c) => c.status === 'rejected').length;
    }
}
