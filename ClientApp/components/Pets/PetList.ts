import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './PetList.html';
import PetService from '@/Services/PetService/PetService';
import Pet from '@/Services/PetService/PetModel';

@WithRender
@Component({})
export default class PetList extends Vue {
    @Inject(PetService) public petService!: PetService;

    public pets: Pet[] = [];
    public filteredPets: Pet[] = [];
    public loading: boolean = true;
    public selectedType: string = 'all';
    public searchQuery: string = '';
    public selectedPet: Pet | null = null;
    public showDetailDialog: boolean = false;
    public showAdoptionDialog: boolean = false;

    // Adoption form
    public adoptionForm = {
        adopterName: '',
        adopterPhone: '',
        adopterEmail: '',
        adopterAddress: '',
        hasExperience: false,
        hasOtherPets: false,
        reasonForAdoption: '',
    };
    public validForm: boolean = false;
    public submittingAdoption: boolean = false;

    // Validation rules
    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        email: (value: string) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return pattern.test(value) || 'البريد الإلكتروني غير صحيح';
        },
        phone: (value: string) => {
            const pattern = /^[0-9]{10}$/;
            return pattern.test(value) || 'رقم الجوال يجب أن يكون 10 أرقام';
        },
    };

    public async mounted() {
        await this.loadPets();
    }

    public async loadPets() {
        this.loading = true;
        try {
            this.pets = await this.petService.getAllPets();
            this.applyFilters();
        } catch (error) {
            console.error('Error loading pets:', error);
        } finally {
            this.loading = false;
        }
    }

    public filterByType(type: string) {
        this.selectedType = type;
        this.applyFilters();
    }

    public applyFilters() {
        let filtered = this.pets;

        // Filter by type
        if (this.selectedType !== 'all') {
            filtered = filtered.filter(pet => pet.type === this.selectedType);
        }

        // Filter by search query
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(pet =>
                pet.name.toLowerCase().includes(query) ||
                pet.breed.toLowerCase().includes(query) ||
                pet.location.toLowerCase().includes(query)
            );
        }

        // Only show available pets
        filtered = filtered.filter(pet => pet.status === 'available');

        this.filteredPets = filtered;
    }

    public viewPetDetails(pet: Pet) {
        this.selectedPet = pet;
        this.showDetailDialog = true;
    }

    public closeDetailDialog() {
        this.showDetailDialog = false;
        this.selectedPet = null;
    }

    public openAdoptionDialog(pet: Pet) {
        this.selectedPet = pet;
        this.showDetailDialog = false;
        this.showAdoptionDialog = true;
    }

    public closeAdoptionDialog() {
        this.showAdoptionDialog = false;
        this.selectedPet = null;
        this.resetAdoptionForm();
    }

    public async submitAdoption() {
        if (!this.selectedPet) return;

        const form = this.$refs.adoptionFormRef as any;
        if (!form.validate()) {
            return;
        }

        this.submittingAdoption = true;

        try {
            const request = {
                petId: this.selectedPet.id,
                ...this.adoptionForm,
            };

            await this.petService.submitAdoptionRequest(request);

            // Show success message
            this.$router.push('/');
            alert('تم إرسال طلب التبني بنجاح! سنتواصل معك قريباً.');

            this.closeAdoptionDialog();
            await this.loadPets();
        } catch (error) {
            console.error('Error submitting adoption:', error);
            alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            this.submittingAdoption = false;
        }
    }

    public resetAdoptionForm() {
        this.adoptionForm = {
            adopterName: '',
            adopterPhone: '',
            adopterEmail: '',
            adopterAddress: '',
            hasExperience: false,
            hasOtherPets: false,
            reasonForAdoption: '',
        };
        this.validForm = false;
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاح للتبني';
            case 'pending': return 'قيد المراجعة';
            case 'adopted': return 'تم التبني';
            default: return status;
        }
    }

    public getStatusClass(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'pending': return `${baseClasses} status--orange`;
            case 'adopted': return `${baseClasses} status--blue`;
            default: return baseClasses;
        }
    }

    public getGenderText(gender: string): string {
        return gender === 'male' ? 'ذكر' : 'أنثى';
    }

    public getTypeText(type: string): string {
        return type === 'cat' ? 'قطة' : 'كلب';
    }

    public getTypeIcon(type: string): string {
        return type === 'cat' ? 'mdi-cat' : 'mdi-dog';
    }
}
