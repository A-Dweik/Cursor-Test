import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    
}
