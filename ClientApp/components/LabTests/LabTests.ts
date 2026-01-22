import { Component, Vue } from 'vue-property-decorator';
import WithRender from './LabTests.html';
import { Inject } from 'vue-di-container';
import LabTestService from '@/Services/LabTestService/LabTestService';
import LabTestModel from '@/Services/LabTestService/LabTestModel';

@WithRender
@Component({})
export default class LabTests extends Vue {
    @Inject(LabTestService) public labTestService!: LabTestService;

    public labTests: LabTestModel[] = [];
    public filteredLabTests: LabTestModel[] = [];
    public searchQuery: string = '';
    public selectedCategory: string = 'الكل';

    public categories: string[] = [
        'الكل',
        'تحاليل دم',
        'تحاليل فيتامينات'
    ];

    async mounted() {
        await this.loadLabTests();
    }

    async loadLabTests() {
        this.labTests = await this.labTestService.getLabTests();
        this.filterLabTests();
    }

    filterLabTests() {
        let filtered = this.labTests;

        if (this.searchQuery) {
            filtered = filtered.filter(t =>
                t.name.includes(this.searchQuery) ||
                t.category.includes(this.searchQuery)
            );
        }

        if (this.selectedCategory !== 'الكل') {
            filtered = filtered.filter(t => t.category === this.selectedCategory);
        }

        this.filteredLabTests = filtered;
    }

    selectCategory(cat: string) {
        this.selectedCategory = cat;
        this.filterLabTests();
    }

    bookTest(test: LabTestModel) {
        this.$router.push({
            name: 'appointments',
            params: { type: 'labtest', entityId: test.id.toString() }
        });
    }
}
