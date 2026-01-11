import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WithRender from './AddHouseDialog.html';
import { Inject } from 'vue-di-container';
import HouseService from '@/Services/HouseService';
import { HouseModel } from '@/Models/HouseModel';

@WithRender
@Component({})
export default class AddHouseDialog extends Vue {
    @Prop({ required: true }) public show!: boolean;
    @Prop({ default: null }) public house!: HouseModel | null;
    @Inject(HouseService) public houseService!: HouseService;

    public valid: boolean = false;
    public loading: boolean = false;

    public formData: HouseModel = {
        id: '',
        title: '',
        description: '',
        location: '',
        price: 0,
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        status: 'available',
        imageUrl: '',
        ownerName: '',
        ownerPhone: '',
        features: [],
    };

    public statusOptions = [
        { text: 'متاح', value: 'available' },
        { text: 'مؤجر', value: 'rented' },
        { text: 'صيانة', value: 'maintenance' },
    ];

    public featureInput: string = '';

    public rules = {
        required: (value: any) => !!value || 'هذا الحقل مطلوب',
        number: (value: any) => (value && value > 0) || 'يجب أن يكون رقماً موجباً',
        phone: (value: string) => {
            const pattern = /^05\d{8}$/;
            return !value || pattern.test(value) || 'رقم الجوال غير صحيح (مثال: 0501234567)';
        },
    };

    @Watch('house', { immediate: true })
    public onHouseChanged(newHouse: HouseModel | null) {
        if (newHouse) {
            this.formData = { ...newHouse };
        } else {
            this.resetForm();
        }
    }

    public get dialogTitle(): string {
        return this.house ? 'تعديل العقار' : 'إضافة عقار جديد';
    }

    public addFeature() {
        if (this.featureInput.trim()) {
            if (!this.formData.features) {
                this.formData.features = [];
            }
            this.formData.features.push(this.featureInput.trim());
            this.featureInput = '';
        }
    }

    public removeFeature(index: number) {
        if (this.formData.features) {
            this.formData.features.splice(index, 1);
        }
    }

    public async save() {
        const form = this.$refs.form as any;
        if (!form.validate()) {
            return;
        }

        this.loading = true;
        try {
            if (this.house && this.house.id) {
                await this.houseService.updateHouse(this.house.id, this.formData);
            } else {
                await this.houseService.createHouse(this.formData);
            }
            this.$emit('saved');
            this.close();
        } catch (error) {
            console.error('Error saving house:', error);
        } finally {
            this.loading = false;
        }
    }

    public close() {
        this.resetForm();
        this.$emit('close');
    }

    public resetForm() {
        this.formData = {
            id: '',
            title: '',
            description: '',
            location: '',
            price: 0,
            bedrooms: 1,
            bathrooms: 1,
            area: 0,
            status: 'available',
            imageUrl: '',
            ownerName: '',
            ownerPhone: '',
            features: [],
        };
        this.featureInput = '';
        const form = this.$refs.form as any;
        if (form) {
            form.resetValidation();
        }
    }
}
