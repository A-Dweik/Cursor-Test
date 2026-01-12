import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandList.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/Models/LandModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class LandList extends Vue {
    @Inject(LandService) public landService!: LandService;

    public lands: LandModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public filterStatus: string = 'all';
    public filterType: string = 'all';

    public statusOptions = [
        { text: 'الكل', value: 'all' },
        { text: 'متاحة', value: 'available' },
        { text: 'محجوزة', value: 'reserved' },
        { text: 'قيد الانتظار', value: 'pending' },
        { text: 'مباعة', value: 'sold' },
    ];

    public typeOptions = [
        { text: 'الكل', value: 'all' },
        { text: 'سكنية', value: 'residential' },
        { text: 'تجارية', value: 'commercial' },
        { text: 'زراعية', value: 'agricultural' },
        { text: 'صناعية', value: 'industrial' },
    ];

    public async mounted() {
        await this.loadLands();
    }

    private async loadLands() {
        try {
            this.loading = true;
            this.lands = await this.landService.getAllLands();
        } catch (error) {
            Toaster.error('فشل تحميل الأراضي');
        } finally {
            this.loading = false;
        }
    }

    public get filteredLands(): LandModel[] {
        let filtered = [...this.lands];

        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(land =>
                land.title.toLowerCase().includes(query) ||
                land.location.toLowerCase().includes(query) ||
                land.city.toLowerCase().includes(query)
            );
        }

        if (this.filterStatus !== 'all') {
            filtered = filtered.filter(land => land.status === this.filterStatus);
        }

        if (this.filterType !== 'all') {
            filtered = filtered.filter(land => land.landType === this.filterType);
        }

        return filtered;
    }

    public viewLand(land: LandModel) {
        this.$router.push(`/lands/${land.id}`);
    }

    public editLand(land: LandModel) {
        this.$router.push(`/lands/${land.id}/edit`);
    }

    public async deleteLand(land: LandModel) {
        if (confirm(`هل أنت متأكد من حذف الأرض "${land.title}"؟`)) {
            try {
                await this.landService.deleteLand(land.id);
                Toaster.success('تم حذف الأرض بنجاح');
                await this.loadLands();
            } catch (error) {
                Toaster.error('فشل حذف الأرض');
            }
        }
    }

    public addNewLand() {
        this.$router.push('/lands/new');
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'pending': return `${baseClasses} status--orange`;
            case 'reserved': return `${baseClasses} status--blue`;
            case 'sold': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاحة';
            case 'pending': return 'قيد الانتظار';
            case 'reserved': return 'محجوزة';
            case 'sold': return 'مباعة';
            default: return status;
        }
    }

    public getVerificationClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'verified': return `${baseClasses} status--green`;
            case 'pending': return `${baseClasses} status--orange`;
            case 'rejected': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getVerificationText(status: string): string {
        switch (status) {
            case 'verified': return 'موثق';
            case 'pending': return 'قيد المراجعة';
            case 'rejected': return 'مرفوض';
            default: return status;
        }
    }

    public getLandTypeText(type: string): string {
        switch (type) {
            case 'residential': return 'سكنية';
            case 'commercial': return 'تجارية';
            case 'agricultural': return 'زراعية';
            case 'industrial': return 'صناعية';
            default: return type;
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
