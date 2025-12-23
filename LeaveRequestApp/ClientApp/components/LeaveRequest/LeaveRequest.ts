import { Component, Vue } from 'vue-property-decorator';
import WithRender from './LeaveRequest.html';
import LeaveRequestService from '@/Services/LeaveRequestService';
import { Inject } from 'vue-di-container';
import LeaveRequestModel from '@/Models/LeaveRequestModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
    components: {},
})
export default class LeaveRequest extends Vue {
    @Inject(LeaveRequestService) public leaveRequestService!: LeaveRequestService;

    public leaveRequest: LeaveRequestModel = {
        id: 0,
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'Pending',
    };

    public leaveTypes: string[] = ['Annual Leave', 'Sick Leave', 'Personal Leave', 'Emergency Leave'];
    public valid: boolean = false;
    public startDateMenu: boolean = false;
    public endDateMenu: boolean = false;

    public rules = {
        required: (value: any) => !!value || 'This field is required',
        minLength: (value: string) => (value && value.length >= 3) || 'Minimum 3 characters required',
    };

    public async submitLeaveRequest() {
        if ((this.$refs.form as any).validate()) {
            try {
                await this.leaveRequestService.createLeaveRequest(this.leaveRequest);
                Toaster.success('Leave request submitted successfully!');
                this.resetForm();
                this.$router.push({ name: 'leave-requests' });
            } catch (error) {
                console.error('Error submitting leave request:', error);
            }
        }
    }

    public resetForm() {
        this.leaveRequest = {
            id: 0,
            employeeName: '',
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: '',
            status: 'Pending',
        };
        (this.$refs.form as any).reset();
    }

    public cancel() {
        this.$router.push({ name: 'leave-requests' });
    }
}
