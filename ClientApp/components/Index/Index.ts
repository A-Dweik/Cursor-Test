import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import pdf, { ViewerpdfType } from '@t2/Viewerpdf';


@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public navigateToBooks(): void {
        this.$router.push('/books');
    }
}
