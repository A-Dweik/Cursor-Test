import { Component, Vue } from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import IPhoneService, { IPhoneModel } from '@/Services/IPhoneService';

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(IPhoneService) public iphoneService!: IPhoneService;

    public loading: boolean = true;
    public iphones: IPhoneModel[] = [];
    public searchQuery: string = '';
    public filteredIPhones: IPhoneModel[] = [];
    public selectedFilter: string = 'all';

    async mounted() {
        await this.loadIPhones();
    }

    private async loadIPhones() {
        try {
            this.loading = true;
            this.iphones = await this.iphoneService.getAllIPhones();
            this.filteredIPhones = this.iphones;
        } catch (error) {
            console.error('Error loading iPhones:', error);
        } finally {
            this.loading = false;
        }
    }

    public filterIPhones(filter: string) {
        this.selectedFilter = filter;
        
        if (filter === 'all') {
            this.filteredIPhones = this.iphones;
        } else if (filter === 'new') {
            this.filteredIPhones = this.iphones.filter(p => p.isNew);
        } else if (filter === 'popular') {
            this.filteredIPhones = this.iphones.filter(p => p.isPopular);
        }
    }

    public async searchIPhones() {
        if (this.searchQuery.trim() === '') {
            this.filteredIPhones = this.iphones;
        } else {
            this.filteredIPhones = await this.iphoneService.searchIPhones(this.searchQuery);
        }
    }

    public viewDetails(id: string) {
        this.$router.push({ name: 'iphone-details', params: { id } });
    }

    public getCategoryIcon(item: IPhoneModel): string {
        if (item.isNew) return 'icon-service';
        if (item.isPopular) return 'icon-personal_account';
        return 'icon-service';
    }
}
