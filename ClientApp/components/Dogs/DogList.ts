import { Component, Vue } from 'vue-property-decorator';
import WithRender from './DogList.html';
import { Inject } from 'vue-di-container';
import DogService from '@/Services/DogService';
import DogModel from '@/Models/DogModel';

@WithRender
@Component({})
export default class DogList extends Vue {
    @Inject(DogService) public dogService!: DogService;

    public dogs: DogModel[] = [];
    public loading: boolean = true;
    public searchQuery: string = '';
    public selectedSize: string = 'all';
    public selectedGender: string = 'all';

    public async mounted() {
        await this.loadDogs();
    }

    private async loadDogs() {
        this.loading = true;
        this.dogs = await this.dogService.getAvailableDogs();
        this.loading = false;
    }

    public get filteredDogs(): DogModel[] {
        return this.dogs.filter(dog => {
            const matchesSearch = !this.searchQuery || 
                dog.nameAr.includes(this.searchQuery) || 
                dog.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                dog.breedAr.includes(this.searchQuery) ||
                dog.breed.toLowerCase().includes(this.searchQuery.toLowerCase());
            
            const matchesSize = this.selectedSize === 'all' || dog.size === this.selectedSize;
            const matchesGender = this.selectedGender === 'all' || dog.gender === this.selectedGender;

            return matchesSearch && matchesSize && matchesGender;
        });
    }

    public viewDogDetails(dogId: number) {
        this.$router.push(`/dogs/${dogId}`);
    }

    public getSizeColor(size: string): string {
        switch (size) {
            case 'small': return 'info';
            case 'medium': return 'warning';
            case 'large': return 'error';
            default: return 'grey';
        }
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
}
