import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import pdf, { ViewerpdfType } from '@t2/Viewerpdf';
import Weather from '../Weather/Weather';


@WithRender
@Component({
     components: {
         Weather,
     },
})
export default class Index extends Vue {

}
