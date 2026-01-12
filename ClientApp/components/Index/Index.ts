import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import pdf, { ViewerpdfType } from '@t2/Viewerpdf';


@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public goToLandList() {
        this.$router.push({ name: 'landList' });
    }

    public goToAddLand() {
        this.$router.push({ name: 'landForm' });
    }
}
