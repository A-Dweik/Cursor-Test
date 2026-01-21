import { Component, Vue } from 'vue-property-decorator';
import WithRender from './IndexPage.html';

interface Contract {
    id: number;
    type: 'sale' | 'rental';
    propertyType: string;
    location: string;
    price: string;
    seller?: string;
    buyer?: string;
    owner?: string;
    tenant?: string;
    status: 'pending' | 'verified' | 'rejected';
    date: string;
    contractNumber: string;
    area?: string;
    description?: string;
    documents?: string[];
}

interface NewContractForm {
    type: 'sale' | 'rental';
    propertyType: string;
    location: string;
    price: string;
    area: string;
    description: string;
    partyOneName: string;
    partyOneId: string;
    partyTwoName: string;
    partyTwoId: string;
}

@WithRender
@Component({
    components: {},
})
export default class Index extends Vue {
    public contracts: Contract[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedFilter: string = 'all';

    // Modal states
    public showDetailModal: boolean = false;
    public showAddModal: boolean = false;
    public showConfirmModal: boolean = false;
    public selectedContract: Contract | null = null;
    public confirmAction: 'verify' | 'reject' | null = null;

    // Form data
    public newContract: NewContractForm = this.getEmptyForm();
    public formErrors: { [key: string]: string } = {};
    public submitting: boolean = false;

    // Property types
    public propertyTypes = [
        'فيلا',
        'شقة',
        'أرض سكنية',
        'أرض تجارية',
        'عمارة سكنية',
        'مكتب تجاري',
        'محل تجاري',
        'مستودع',
        'مزرعة'
    ];

    // Locations
    public locations = [
        'الرياض',
        'جدة',
        'مكة المكرمة',
        'المدينة المنورة',
        'الدمام',
        'الخبر',
        'الطائف',
        'تبوك',
        'أبها'
    ];

    public mounted() {
        document.title = 'SigmaS | تثبيت عقود بيع وإيجار العقارات';
        this.loadContracts();
    }

    public getEmptyForm(): NewContractForm {
        return {
            type: 'sale',
            propertyType: '',
            location: '',
            price: '',
            area: '',
            description: '',
            partyOneName: '',
            partyOneId: '',
            partyTwoName: '',
            partyTwoId: ''
        };
    }

    public loadContracts() {
        this.loading = true;
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
                    contractNumber: 'CV-2026-001',
                    area: '450 متر مربع',
                    description: 'فيلا دوبلكس حديثة البناء مع حديقة ومسبح'
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
                    contractNumber: 'CR-2026-045',
                    area: '180 متر مربع',
                    description: 'شقة مفروشة بالكامل، 3 غرف نوم'
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
                    contractNumber: 'CV-2026-002',
                    area: '600 متر مربع',
                    description: 'أرض سكنية في موقع مميز قريبة من الخدمات'
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
                    contractNumber: 'CR-2026-046',
                    area: '120 متر مربع',
                    description: 'مكتب في برج تجاري راقي مع مواقف سيارات'
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
                    contractNumber: 'CV-2026-003',
                    area: '1200 متر مربع',
                    description: 'عمارة سكنية 6 أدوار تحتوي على 12 شقة'
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
                    contractNumber: 'CR-2026-047',
                    area: '85 متر مربع',
                    description: 'محل تجاري على شارع رئيسي'
                }
            ];
            this.loading = false;
        }, 500);
    }

    // Statistics
    public get totalContracts(): number {
        return this.contracts.length;
    }

    public get pendingContracts(): number {
        return this.contracts.filter(c => c.status === 'pending').length;
    }

    public get verifiedContracts(): number {
        return this.contracts.filter(c => c.status === 'verified').length;
    }

    public get rejectedContracts(): number {
        return this.contracts.filter(c => c.status === 'rejected').length;
    }

    public get saleContractsCount(): number {
        return this.contracts.filter(c => c.type === 'sale').length;
    }

    public get rentalContractsCount(): number {
        return this.contracts.filter(c => c.type === 'rental').length;
    }

    public get filteredContracts(): Contract[] {
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

    // Modal handlers
    public openDetailModal(contract: Contract) {
        this.selectedContract = contract;
        this.showDetailModal = true;
    }

    public closeDetailModal() {
        this.showDetailModal = false;
        this.selectedContract = null;
    }

    public openAddModal() {
        this.newContract = this.getEmptyForm();
        this.formErrors = {};
        this.showAddModal = true;
    }

    public closeAddModal() {
        this.showAddModal = false;
        this.newContract = this.getEmptyForm();
        this.formErrors = {};
    }

    public openConfirmModal(contract: Contract, action: 'verify' | 'reject') {
        this.selectedContract = contract;
        this.confirmAction = action;
        this.showConfirmModal = true;
    }

    public closeConfirmModal() {
        this.showConfirmModal = false;
        this.selectedContract = null;
        this.confirmAction = null;
    }

    // Actions
    public confirmActionExecute() {
        if (!this.selectedContract || !this.confirmAction) return;

        if (this.confirmAction === 'verify') {
            this.selectedContract.status = 'verified';
        } else {
            this.selectedContract.status = 'rejected';
        }

        this.closeConfirmModal();
    }

    public validateForm(): boolean {
        this.formErrors = {};
        let isValid = true;

        if (!this.newContract.propertyType) {
            this.formErrors.propertyType = 'يرجى اختيار نوع العقار';
            isValid = false;
        }

        if (!this.newContract.location) {
            this.formErrors.location = 'يرجى إدخال الموقع';
            isValid = false;
        }

        if (!this.newContract.price) {
            this.formErrors.price = 'يرجى إدخال السعر';
            isValid = false;
        }

        if (!this.newContract.partyOneName) {
            this.formErrors.partyOneName = 'يرجى إدخال اسم الطرف الأول';
            isValid = false;
        }

        if (!this.newContract.partyOneId || !/^[1-2]\d{9}$/.test(this.newContract.partyOneId)) {
            this.formErrors.partyOneId = 'يرجى إدخال رقم هوية صحيح';
            isValid = false;
        }

        if (!this.newContract.partyTwoName) {
            this.formErrors.partyTwoName = 'يرجى إدخال اسم الطرف الثاني';
            isValid = false;
        }

        if (!this.newContract.partyTwoId || !/^[1-2]\d{9}$/.test(this.newContract.partyTwoId)) {
            this.formErrors.partyTwoId = 'يرجى إدخال رقم هوية صحيح';
            isValid = false;
        }

        return isValid;
    }

    public submitNewContract() {
        if (!this.validateForm()) return;

        this.submitting = true;

        setTimeout(() => {
            const newId = Math.max(...this.contracts.map(c => c.id)) + 1;
            const contractNumber = this.newContract.type === 'sale'
                ? `CV-2026-${String(newId).padStart(3, '0')}`
                : `CR-2026-${String(newId + 50).padStart(3, '0')}`;

            const contract: Contract = {
                id: newId,
                type: this.newContract.type,
                propertyType: this.newContract.propertyType,
                location: this.newContract.location,
                price: this.newContract.type === 'sale'
                    ? `${this.newContract.price} ريال`
                    : `${this.newContract.price} ريال/شهرياً`,
                status: 'pending',
                date: new Date().toISOString().split('T')[0],
                contractNumber: contractNumber,
                area: this.newContract.area ? `${this.newContract.area} متر مربع` : undefined,
                description: this.newContract.description
            };

            if (this.newContract.type === 'sale') {
                contract.seller = this.newContract.partyOneName;
                contract.buyer = this.newContract.partyTwoName;
            } else {
                contract.owner = this.newContract.partyOneName;
                contract.tenant = this.newContract.partyTwoName;
            }

            this.contracts.unshift(contract);
            this.submitting = false;
            this.closeAddModal();
        }, 1000);
    }

    public printContract() {
        window.print();
    }

    // Helper methods
    public getStatusText(status: string): string {
        switch (status) {
            case 'verified': return 'موثق';
            case 'pending': return 'قيد المراجعة';
            case 'rejected': return 'مرفوض';
            default: return status;
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'contract-status';
        switch (status) {
            case 'verified': return `${baseClasses} contract-status--verified`;
            case 'pending': return `${baseClasses} contract-status--pending`;
            case 'rejected': return `${baseClasses} contract-status--rejected`;
            default: return baseClasses;
        }
    }

    public getContractTypeText(type: string): string {
        return type === 'sale' ? 'عقد بيع' : 'عقد إيجار';
    }

    public getContractTypeIcon(type: string): string {
        return type === 'sale' ? 'mdi-home-currency-usd' : 'mdi-home-city';
    }

    public formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
