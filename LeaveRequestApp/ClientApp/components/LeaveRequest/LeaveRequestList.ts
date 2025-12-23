import { Component, Vue } from 'vue-property-decorator';
import WithRender from './LeaveRequestList.html';
import LeaveRequestService from '@/Services/LeaveRequestService';
import { Inject } from 'vue-di-container';
import LeaveRequestModel from '@/Models/LeaveRequestModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
    components: {},
})
export default class LeaveRequestList extends Vue {
    @Inject(LeaveRequestService) public leaveRequestService!: LeaveRequestService;

    public leaveRequests: LeaveRequestModel[] = [];
    public headers = [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Employee Name', value: 'employeeName', sortable: true },
        { text: 'Leave Type', value: 'leaveType', sortable: true },
        { text: 'Start Date', value: 'startDate', sortable: true },
        { text: 'End Date', value: 'endDate', sortable: true },
        { text: 'Status', value: 'status', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
    ];
    public loading: boolean = false;
    public dialog: boolean = false;
    public selectedRequest: LeaveRequestModel | null = null;

    public async mounted() {
        await this.loadLeaveRequests();
    }

    public async loadLeaveRequests() {
        this.loading = true;
        try {
            this.leaveRequests = await this.leaveRequestService.getLeaveRequests();
        } catch (error) {
            console.error('Error loading leave requests:', error);
        } finally {
            this.loading = false;
        }
    }

    public viewDetails(request: LeaveRequestModel) {
        this.selectedRequest = request;
        this.dialog = true;
    }

    public async updateStatus(id: number, status: string) {
        try {
            await this.leaveRequestService.updateLeaveRequestStatus(id, status);
            Toaster.success(`Leave request ${status.toLowerCase()} successfully!`);
            await this.loadLeaveRequests();
        } catch (error) {
            console.error('Error updating leave request status:', error);
        }
    }

    public async deleteRequest(id: number) {
        if (confirm('Are you sure you want to delete this leave request?')) {
            try {
                await this.leaveRequestService.deleteLeaveRequest(id);
                Toaster.success('Leave request deleted successfully!');
                await this.loadLeaveRequests();
            } catch (error) {
                console.error('Error deleting leave request:', error);
            }
        }
    }

    public createNewRequest() {
        this.$router.push({ name: 'new-leave-request' });
    }

    public closeDialog() {
        this.dialog = false;
        this.selectedRequest = null;
    }

    public getStatusColor(status: string) {
        switch (status) {
            case 'Approved':
                return 'success';
            case 'Rejected':
                return 'error';
            case 'Pending':
                return 'warning';
            default:
                return 'grey';
        }
    }
}
