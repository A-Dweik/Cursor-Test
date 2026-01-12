import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './LandForm.html';
import LandService from '@/Services/LandService/LandService';
import LandModel from '@/Services/LandService/LandModel';

@WithRender
@Component({})
export default class LandForm extends Vue {
    @Inject(LandService) public landService!: LandService;

    public land: LandModel = {
        id: '',
        title: '',
        description: '',
        location: '',
        city: '',
        area: 0,
        pricePerMonth: 0,
        status: 'available',
        ownerName: '',
        ownerPhone: '',
        ownerEmail: '',
        features: [],
        images: [],
        createdDate: '',
        updatedDate: '',
    };

    public valid: boolean = false;
    public loading: boolean = false;
    public isEditMode: boolean = false;
    public newFeature: string = '';

    public statusOptions = [
        { text: 'متاح', value: 'available' },
        { text: 'مؤجر', value: 'rented' },
        { text: 'قيد المراجعة', value: 'pending' },
    ];

    public cities = [
        'الرياض',
        'جدة',
        'الدمام',
        'الخرج',
        'مكة',
        'المدينة',
        'الطائف',
        'تبوك',
        'أبها',
        'الأحساء',
    ];

    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        number: (value: number) => value > 0 || 'يجب أن يكون الرقم أكبر من صفر',
        email: (value: string) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || 'البريد الإلكتروني غير صحيح';
        },
        phone: (value: string) => {
            const pattern = /^(\+966|00966|0)?5[0-9]{8}$/;
            return pattern.test(value) || 'رقم الجوال غير صحيح';
        },
    };

    public async mounted() {
        const landId = this.$route.params.id;
        if (landId) {
            this.isEditMode = true;
            await this.loadLand(landId);
        }
    }

    public async loadLand(id: string) {
        this.loading = true;
        const land = await this.landService.getLandById(id);
        if (land) {
            this.land = { ...land };
        } else {
            this.$router.push({ name: 'landList' });
        }
        this.loading = false;
    }

    public addFeature() {
        if (this.newFeature.trim()) {
            this.land.features.push(this.newFeature.trim());
            this.newFeature = '';
        }
    }

    public removeFeature(index: number) {
        this.land.features.splice(index, 1);
    }

    public async submit() {
        const form: any = this.$refs.form;
        if (form.validate()) {
            this.loading = true;
            let success = false;

            if (this.isEditMode) {
                success = await this.landService.updateLand(this.land);
            } else {
                success = await this.landService.addLand(this.land);
            }

            this.loading = false;

            if (success) {
                this.$router.push({ name: 'landList' });
            }
        }
    }

    public cancel() {
        this.$router.push({ name: 'landList' });
    }
}
