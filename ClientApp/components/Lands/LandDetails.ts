import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandDetails.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/LandModel';

@WithRender
@Component({})
export default class LandDetails extends Vue {
    @Inject(LandService) public landService!: LandService;

    public land: LandModel | null = null;
    public loading: boolean = false;

    public async mounted() {
        const landId = this.$route.params.id;
        if (landId) {
            await this.loadLand(landId);
        } else {
            this.$router.push({ name: 'landList' });
        }
    }

    public async loadLand(id: string) {
        this.loading = true;
        this.land = await this.landService.getLandById(id);
        if (!this.land) {
            this.$router.push({ name: 'landList' });
        }
        this.loading = false;
    }

    public goBack() {
        this.$router.push({ name: 'landList' });
    }

    public editLand() {
        if (this.land) {
            this.$router.push({ name: 'landForm', params: { id: this.land.id } });
        }
    }

    public async deleteLand() {
        if (this.land && confirm(`هل أنت متأكد من حذف "${this.land.title}"؟`)) {
            const success = await this.landService.deleteLand(this.land.id);
            if (success) {
                this.$router.push({ name: 'landList' });
            }
        }
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
        return `${area.toLocaleString('ar-SA')} متر مربع`;
    }

    public formatDate(date: string): string {
        return new Date(date).toLocaleDateString('ar-SA');
    }
}
