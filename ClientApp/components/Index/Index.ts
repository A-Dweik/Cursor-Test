import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public totalLands: number = 0;
    public availableLands: number = 0;
    public soldLands: number = 0;

    public mounted() {
        this.loadStats();
    }

    private async loadStats() {
        // In real app, fetch from API
        this.totalLands = 0;
        this.availableLands = 0;
        this.soldLands = 0;
    }

    public goToLands() {
        this.$router.push('/lands');
    }

    public goToAddLand() {
        this.$router.push('/lands/new');
    }
}
