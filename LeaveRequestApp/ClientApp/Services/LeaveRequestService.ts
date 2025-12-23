import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import LeaveRequestModel from '@/Models/LeaveRequestModel';

@Service()
export default class LeaveRequestService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    public async getLeaveRequests(): Promise<LeaveRequestModel[]> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/LeaveRequest';
            const result = await this.axiosService.axiosInstance.get<LeaveRequestModel[]>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async getLeaveRequestById(id: number): Promise<LeaveRequestModel> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/LeaveRequest/${id}`;
            const result = await this.axiosService.axiosInstance.get<LeaveRequestModel>(url);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async createLeaveRequest(leaveRequest: LeaveRequestModel): Promise<LeaveRequestModel> {
        try {
            this.loaderService.ShowLoader();
            const url = 'api/LeaveRequest';
            const result = await this.axiosService.axiosInstance.post<LeaveRequestModel>(url, leaveRequest);
            this.loaderService.HideLoader();
            return result.data;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async updateLeaveRequest(id: number, leaveRequest: LeaveRequestModel): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/LeaveRequest/${id}`;
            await this.axiosService.axiosInstance.put(url, leaveRequest);
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async updateLeaveRequestStatus(id: number, status: string): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/LeaveRequest/${id}/status`;
            await this.axiosService.axiosInstance.patch(url, { status });
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async deleteLeaveRequest(id: number): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            const url = `api/LeaveRequest/${id}`;
            await this.axiosService.axiosInstance.delete(url);
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }
}
