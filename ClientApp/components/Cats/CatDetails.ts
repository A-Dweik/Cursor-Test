import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './CatDetails.html';
import { Inject } from 'vue-di-container';
import CatService from '@/Services/CatService';
import { Cat } from '@/Services/Models/Cat';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class CatDetails extends Vue {
    @Inject(CatService) public catService!: CatService;
    @Prop() public id!: string;

    public cat: Cat | null = null;
    public loading: boolean = true;
    public showAdoptionDialog: boolean = false;
    public adoptionForm = {
        name: '',
        email: '',
        phone: '',
        address: '',
        hasExperience: false,
        hasPets: false,
        reason: ''
    };
    public valid: boolean = false;
    public submitting: boolean = false;

    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        email: (value: string) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || 'البريد الإلكتروني غير صحيح';
        },
        phone: (value: string) => {
            const pattern = /^[0-9]{10}$/;
            return pattern.test(value) || 'رقم الجوال يجب أن يكون 10 أرقام';
        }
    };

    public async mounted() {
        await this.loadCatDetails();
    }

    public async loadCatDetails() {
        this.loading = true;
        const result = await this.catService.getCatById(this.id);
        if (result) {
            this.cat = result;
        }
        this.loading = false;
    }

    public openAdoptionDialog() {
        this.showAdoptionDialog = true;
    }

    public closeAdoptionDialog() {
        this.showAdoptionDialog = false;
        this.resetForm();
    }

    public async submitAdoption() {
        if (!this.valid) {
            return;
        }

        this.submitting = true;
        const success = await this.catService.adoptCat(this.id, this.adoptionForm);
        this.submitting = false;

        if (success) {
            Toaster.success('تم تقديم طلب التبني بنجاح! سنتواصل معك قريباً');
            this.closeAdoptionDialog();
            this.$router.push({ name: 'home' });
        } else {
            Toaster.error('حدث خطأ في تقديم الطلب، يرجى المحاولة مرة أخرى');
        }
    }

    public resetForm() {
        this.adoptionForm = {
            name: '',
            email: '',
            phone: '',
            address: '',
            hasExperience: false,
            hasPets: false,
            reason: ''
        };
        this.valid = false;
    }

    public goBack() {
        this.$router.push({ name: 'home' });
    }

    public getAgeLabel(age: string): string {
        switch(age) {
            case 'kitten': return 'قطة صغيرة';
            case 'young': return 'قطة شابة';
            case 'adult': return 'قطة بالغة';
            default: return age;
        }
    }
}
