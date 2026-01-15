import { Component, Vue } from 'vue-property-decorator';
import WithRender from './DogDetails.html';
import { Inject } from 'vue-di-container';
import DogService from '@/Services/DogService';
import DogModel from '@/Models/DogModel';

@WithRender
@Component({})
export default class DogDetails extends Vue {
    @Inject(DogService) public dogService!: DogService;

    public dog: DogModel | null = null;
    public loading: boolean = true;
    public showAdoptionDialog: boolean = false;

    public async mounted() {
        await this.loadDog();
    }

    private async loadDog() {
        this.loading = true;
        const dogId = parseInt(this.$route.params.id);
        this.dog = await this.dogService.getDogById(dogId);
        this.loading = false;
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'pending': return `${baseClasses} status--orange`;
            case 'adopted': return `${baseClasses} status--blue`;
            default: return baseClasses;
        }
    }

    public openAdoptionForm() {
        if (this.dog) {
            this.$router.push(`/adopt/${this.dog.id}`);
        }
    }

    public goBack() {
        this.$router.push('/dogs');
    }
}
