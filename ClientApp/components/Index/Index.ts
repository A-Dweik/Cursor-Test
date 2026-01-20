import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public contracts: any[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedFilter: string = 'all';
    
    public mounted() {
        this.loadContracts();
    }

    public loadContracts() {
        this.loading = true;
        // Simulated contract data
        setTimeout(() => {
            this.contracts = [
                {
                    id: 1,
                    type: 'sale',
                    propertyType: 'فيلا',
                    location: 'الرياض - حي النرجس',
                    price: '2,500,000 ريال',
                    seller: 'محمد أحمد العلي',
                    buyer: 'خالد سعد المطيري',
                    status: 'pending',
                    date: '2026-01-15',
                    contractNumber: 'CV-2026-001'
                },
                {
                    id: 2,
                    type: 'rental',
                    propertyType: 'شقة',
                    location: 'جدة - حي الروضة',
                    price: '3,500 ريال/شهرياً',
                    owner: 'سعد عبدالله الغامدي',
                    tenant: 'أحمد علي الزهراني',
                    status: 'verified',
                    date: '2026-01-12',
                    contractNumber: 'CR-2026-045'
                },
                {
                    id: 3,
                    type: 'sale',
                    propertyType: 'أرض سكنية',
                    location: 'الدمام - حي الفيصلية',
                    price: '1,200,000 ريال',
                    seller: 'فهد محمد القحطاني',
                    buyer: 'عبدالرحمن سليمان الدوسري',
                    status: 'verified',
                    date: '2026-01-10',
                    contractNumber: 'CV-2026-002'
                },
                {
                    id: 4,
                    type: 'rental',
                    propertyType: 'مكتب تجاري',
                    location: 'الرياض - حي العليا',
                    price: '8,000 ريال/شهرياً',
                    owner: 'شركة العقارات المتقدمة',
                    tenant: 'مؤسسة التقنية الحديثة',
                    status: 'rejected',
                    date: '2026-01-08',
                    contractNumber: 'CR-2026-046'
                },
                {
                    id: 5,
                    type: 'sale',
                    propertyType: 'عمارة سكنية',
                    location: 'مكة المكرمة - حي العزيزية',
                    price: '5,800,000 ريال',
                    seller: 'ناصر عبدالعزيز الشهري',
                    buyer: 'مجموعة الاستثمار العقاري',
                    status: 'pending',
                    date: '2026-01-18',
                    contractNumber: 'CV-2026-003'
                },
                {
                    id: 6,
                    type: 'rental',
                    propertyType: 'محل تجاري',
                    location: 'الخبر - حي الكورنيش',
                    price: '4,200 ريال/شهرياً',
                    owner: 'عبدالله حسن العتيبي',
                    tenant: 'مؤسسة التجارة الحديثة',
                    status: 'verified',
                    date: '2026-01-05',
                    contractNumber: 'CR-2026-047'
                }
            ];
            this.loading = false;
        }, 500);
    }

    public get filteredContracts() {
        let filtered = this.contracts;

        if (this.selectedFilter !== 'all') {
            filtered = filtered.filter(c => c.type === this.selectedFilter);
        }

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(c => 
                c.contractNumber.toLowerCase().includes(query) ||
                c.location.toLowerCase().includes(query) ||
                c.propertyType.toLowerCase().includes(query)
            );
        }

        return filtered;
    }

    public selectFilter(filter: string) {
        this.selectedFilter = filter;
    }

    public viewContract(contract: any) {
        alert(`عرض تفاصيل العقد: ${contract.contractNumber}`);
    }

    public verifyContract(contract: any) {
        contract.status = 'verified';
        alert(`تم تثبيت العقد: ${contract.contractNumber}`);
    }

    public rejectContract(contract: any) {
        contract.status = 'rejected';
        alert(`تم رفض العقد: ${contract.contractNumber}`);
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'verified': return 'موثق';
            case 'pending': return 'قيد المراجعة';
            case 'rejected': return 'مرفوض';
            default: return status;
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'verified': return `${baseClasses} status--green`;
            case 'pending': return `${baseClasses} status--orange`;
            case 'rejected': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getContractTypeText(type: string): string {
        return type === 'sale' ? 'عقد بيع' : 'عقد إيجار';
    }

    public getCategoryIcon(type: string): string {
        return type === 'sale' ? 'icon-document' : 'icon-building';
    }

    public get saleContractsCount(): number {
        return this.contracts.filter(c => c.type === 'sale').length;
    }

    public get rentalContractsCount(): number {
        return this.contracts.filter(c => c.type === 'rental').length;
    }
}
