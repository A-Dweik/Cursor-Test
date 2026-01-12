import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandForm.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/Models/LandModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class LandForm extends Vue {
    @Inject(LandService) public landService!: LandService;

    public land: Partial<LandModel> = {
        title: '',
        description: '',
        area: 0,
        price: 0,
        location: '',
        city: '',
        district: '',
        ownerName: '',
        ownerPhone: '',
        landType: 'residential',
        hasElectricity: false,
        hasWater: false,
        hasRoads: false,
        images: [],
        documents: [],
    };

    public valid: boolean = false;
    public loading: boolean = false;
    public isEditMode: boolean = false;

    public landTypeOptions = [
        { text: 'سكنية', value: 'residential' },
        { text: 'تجارية', value: 'commercial' },
        { text: 'زراعية', value: 'agricultural' },
        { text: 'صناعية', value: 'industrial' },
    ];

    public rules = {
        required: (value: any) => !!value || 'هذا الحقل مطلوب',
        number: (value: any) => !isNaN(value) && value > 0 || 'يجب إدخال رقم صحيح',
        phone: (value: string) => /^05\d{8}$/.test(value) || 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05)',
    };

    public async mounted() {
        const landId = this.$route.params.id;
        if (landId) {
            this.isEditMode = true;
            await this.loadLand(landId);
        }
    }

    private async loadLand(id: string) {
        try {
            this.loading = true;
            const land = await this.landService.getLandById(id);
            if (land) {
                this.land = { ...land };
            } else {
                Toaster.error('الأرض غير موجودة');
                this.$router.push('/lands');
            }
        } catch (error) {
            Toaster.error('فشل تحميل بيانات الأرض');
        } finally {
            this.loading = false;
        }
    }

    public async save() {
        const form: any = this.$refs.form;
        if (!form.validate()) {
            Toaster.error('الرجاء تعبئة جميع الحقول المطلوبة');
            return;
        }

        try {
            this.loading = true;
            if (this.isEditMode && this.land.id) {
                await this.landService.updateLand(this.land.id, this.land as LandModel);
                Toaster.success('تم تحديث الأرض بنجاح');
            } else {
                await this.landService.createLand(this.land as LandModel);
                Toaster.success('تم إضافة الأرض بنجاح');
            }
            this.$router.push('/lands');
        } catch (error) {
            Toaster.error('فشل حفظ الأرض');
        } finally {
            this.loading = false;
        }
    }

    public cancel() {
        this.$router.push('/lands');
    }

    public reset() {
        const form: any = this.$refs.form;
        form.reset();
    }
}
