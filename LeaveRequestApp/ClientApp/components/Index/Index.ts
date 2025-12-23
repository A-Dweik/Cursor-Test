import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import pdf, { ViewerpdfType } from '@t2/Viewerpdf';


@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public goToLeaveRequests() {
        this.$router.push({ name: 'leave-requests' });
    }

    public goToNewRequest() {
        this.$router.push({ name: 'new-leave-request' });
    }
}
