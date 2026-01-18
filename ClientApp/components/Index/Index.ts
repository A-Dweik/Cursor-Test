import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import CatService from '@/Services/CatService';
import { Cat } from '@/Services/Models/Cat';

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(CatService) public catService!: CatService;
    
    public cats: Cat[] = [];
    public loading: boolean = true;
    public selectedFilter: string = 'all';

    public async mounted() {
        await this.loadCats();
    }

    public async loadCats() {
        this.loading = true;
        this.cats = await this.catService.getAllCats();
        this.loading = false;
    }

    public get filteredCats(): Cat[] {
        if (this.selectedFilter === 'all') {
            return this.cats;
        }
        return this.cats.filter(cat => cat.age === this.selectedFilter);
    }

    public filterCats(filter: string) {
        this.selectedFilter = filter;
    }

    public viewCatDetails(catId: string) {
        this.$router.push({ name: 'catDetails', params: { id: catId } });
    }

    public getAgeLabel(age: string): string {
        switch(age) {
            case 'kitten': return 'قطط صغيرة';
            case 'young': return 'قطط شابة';
            case 'adult': return 'قطط بالغة';
            default: return age;
        }
    }

    public getCategoryIcon(age: string): string {
        switch(age) {
            case 'kitten': return 'icon-personal_account';
            case 'young': return 'icon-company';
            case 'adult': return 'icon-service';
            default: return 'icon-service';
        }
    }
}
