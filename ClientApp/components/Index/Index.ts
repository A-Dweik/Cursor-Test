import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

@WithRender
@Component({
})
export default class Index extends Vue {
    public navigateToWeather(): void {
        this.$router.push('/weather');
    }
}
