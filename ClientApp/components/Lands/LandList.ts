import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandList.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/LandModel';

@WithRender
@Component({})
export default class LandList extends Vue {
    @Inject(LandService) public landService!: LandService;

    public lands: LandModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public showFilters: boolean = false;

    // Filter options
    public filterStatus: string = '';
    public filterCity: string = '';
    public filterMinArea: number | null = null;
    public filterMaxArea: number | null = null;
    public filterMinPrice: number | null = null;
    public filterMaxPrice: number | null = null;

    public statusOptions = [
        { text: 'الكل', value: '' },
        { text: 'متاح', value: 'available' },
        { text: 'مؤجر', value: 'rented' },
        { text: 'قيد المراجعة', value: 'pending' },
    ];

    public cities = [
        { text: 'الكل', value: '' },
        { text: 'الرياض', value: 'الرياض' },
        { text: 'جدة', value: 'جدة' },
        { text: 'الدمام', value: 'الدمام' },
        { text: 'الخرج', value: 'الخرج' },
        { text: 'مكة', value: 'مكة' },
        { text: 'المدينة', value: 'المدينة' },
    ];

    public async mounted() {
        await this.loadLands();
    }

    public async loadLands() {
        this.loading = true;
        this.lands = await this.landService.getAllLands();
        this.loading = false;
    }

    public async searchLands() {
        if (this.searchQuery.trim()) {
            this.loading = true;
            this.lands = await this.landService.searchLands(this.searchQuery);
            this.loading = false;
        } else {
            await this.loadLands();
        }
    }

    public async applyFilters() {
        this.loading = true;
        const filters: any = {};
        if (this.filterStatus) filters.status = this.filterStatus;
        if (this.filterCity) filters.city = this.filterCity;
        if (this.filterMinArea) filters.minArea = this.filterMinArea;
        if (this.filterMaxArea) filters.maxArea = this.filterMaxArea;
        if (this.filterMinPrice) filters.minPrice = this.filterMinPrice;
        if (this.filterMaxPrice) filters.maxPrice = this.filterMaxPrice;

        this.lands = await this.landService.filterLands(filters);
        this.loading = false;
        this.showFilters = false;
    }

    public clearFilters() {
        this.filterStatus = '';
        this.filterCity = '';
        this.filterMinArea = null;
        this.filterMaxArea = null;
        this.filterMinPrice = null;
        this.filterMaxPrice = null;
        this.loadLands();
    }

    public viewLand(land: LandModel) {
        this.$router.push({ name: 'landDetails', params: { id: land.id } });
    }

    public editLand(land: LandModel) {
        this.$router.push({ name: 'landForm', params: { id: land.id } });
    }

    public async deleteLand(land: LandModel) {
        if (confirm(`هل أنت متأكد من حذف "${land.title}"؟`)) {
            const success = await this.landService.deleteLand(land.id);
            if (success) {
                await this.loadLands();
            }
        }
    }

    public addNewLand() {
        this.$router.push({ name: 'landForm' });
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'rented': return `${baseClasses} status--red`;
            case 'pending': return `${baseClasses} status--orange`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاح';
            case 'rented': return 'مؤجر';
            case 'pending': return 'قيد المراجعة';
            default: return status;
        }
    }

    public formatPrice(price: number): string {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR',
            minimumFractionDigits: 0,
        }).format(price);
    }

    public formatArea(area: number): string {
        return `${area.toLocaleString('ar-SA')} م²`;
    }
}
