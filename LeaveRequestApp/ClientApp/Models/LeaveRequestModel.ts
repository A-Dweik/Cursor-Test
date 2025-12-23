export default interface LeaveRequestModel {
    id: number;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}
