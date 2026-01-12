import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandDetails.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/Models/LandModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class LandDetails extends Vue {
    @Inject(LandService) public landService!: LandService;

    public land: LandModel | null = null;
    public loading: boolean = false;
    public verifyDialog: boolean = false;
    public verifyAction: 'verified' | 'rejected' = 'verified';
    public statusDialog: boolean = false;
    public newStatus: LandModel['status'] = 'available';

    public statusOptions = [
        { text: 'متاحة', value: 'available' },
        { text: 'محجوزة', value: 'reserved' },
        { text: 'قيد الانتظار', value: 'pending' },
        { text: 'مباعة', value: 'sold' },
    ];

    public async mounted() {
        const landId = this.$route.params.id;
        if (landId) {
            await this.loadLand(landId);
        }
    }

    private async loadLand(id: string) {
        try {
            this.loading = true;
            this.land = await this.landService.getLandById(id);
            if (!this.land) {
                Toaster.error('الأرض غير موجودة');
                this.$router.push('/lands');
            }
        } catch (error) {
            Toaster.error('فشل تحميل بيانات الأرض');
        } finally {
            this.loading = false;
        }
    }

    public editLand() {
        if (this.land) {
            this.$router.push(`/lands/${this.land.id}/edit`);
        }
    }

    public async deleteLand() {
        if (!this.land) return;

        if (confirm(`هل أنت متأكد من حذف الأرض "${this.land.title}"؟`)) {
            try {
                await this.landService.deleteLand(this.land.id);
                Toaster.success('تم حذف الأرض بنجاح');
                this.$router.push('/lands');
            } catch (error) {
                Toaster.error('فشل حذف الأرض');
            }
        }
    }

    public openVerifyDialog(action: 'verified' | 'rejected') {
        this.verifyAction = action;
        this.verifyDialog = true;
    }

    public async confirmVerify() {
        if (!this.land) return;

        try {
            await this.landService.verifyLand(this.land.id, this.verifyAction);
            Toaster.success(
                this.verifyAction === 'verified' 
                    ? 'تم توثيق الأرض بنجاح' 
                    : 'تم رفض الأرض'
            );
            await this.loadLand(this.land.id);
            this.verifyDialog = false;
        } catch (error) {
            Toaster.error('فشل تحديث حالة التوثيق');
        }
    }

    public openStatusDialog() {
        if (this.land) {
            this.newStatus = this.land.status;
            this.statusDialog = true;
        }
    }

    public async updateStatus() {
        if (!this.land) return;

        try {
            await this.landService.updateLandStatus(this.land.id, this.newStatus);
            Toaster.success('تم تحديث حالة الأرض بنجاح');
            await this.loadLand(this.land.id);
            this.statusDialog = false;
        } catch (error) {
            Toaster.error('فشل تحديث حالة الأرض');
        }
    }

    public goBack() {
        this.$router.push('/lands');
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

    public formatDate(date: string): string {
        return new Date(date).toLocaleDateString('ar-SA');
    }
}
