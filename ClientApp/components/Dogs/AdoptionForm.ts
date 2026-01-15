import { Component, Vue } from 'vue-property-decorator';
import WithRender from './AdoptionForm.html';
import { Inject } from 'vue-di-container';
import DogService from '@/Services/DogService';
import DogModel, { AdoptionApplicationModel } from '@/Models/DogModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class AdoptionForm extends Vue {
    @Inject(DogService) public dogService!: DogService;

    public dog: DogModel | null = null;
    public loading: boolean = true;
    public submitting: boolean = false;
    public valid: boolean = false;

    // Form data
    public application: AdoptionApplicationModel = {
        dogId: 0,
        applicantName: '',
        applicantEmail: '',
        applicantPhone: '',
        address: '',
        hasYard: false,
        hasPets: false,
        petDetails: '',
        hasChildren: false,
        childrenAges: '',
        previousPetExperience: false,
        experienceDetails: '',
        reason: '',
    };

    // Validation rules
    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        email: (value: string) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || 'البريد الإلكتروني غير صحيح';
        },
        phone: (value: string) => {
            const pattern = /^[0-9]{10}$/;
            return pattern.test(value) || 'رقم الهاتف يجب أن يكون 10 أرقام';
        },
        minLength: (min: number) => (value: string) =>
            (value && value.length >= min) || `الحد الأدنى ${min} أحرف`,
    };

    public async mounted() {
        await this.loadDog();
    }

    private async loadDog() {
        this.loading = true;
        const dogId = parseInt(this.$route.params.id);
        this.dog = await this.dogService.getDogById(dogId);
        if (this.dog) {
            this.application.dogId = this.dog.id;
        }
        this.loading = false;
    }

    public async submitApplication() {
        const form: any = this.$refs.form;
        if (form.validate()) {
            this.submitting = true;
            const success = await this.dogService.submitAdoptionApplication(this.application);
            this.submitting = false;

            if (success) {
                Toaster.success('تم تقديم طلب التبني بنجاح! سنتواصل معك قريباً.', 'نجح');
                setTimeout(() => {
                    this.$router.push('/dogs');
                }, 2000);
            } else {
                Toaster.error('حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.');
            }
        }
    }

    public cancel() {
        if (this.dog) {
            this.$router.push(`/dogs/${this.dog.id}`);
        } else {
            this.$router.push('/dogs');
        }
    }
}
