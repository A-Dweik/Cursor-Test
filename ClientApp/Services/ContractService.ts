import { Service } from 'vue-di-container';
import AxiosService from './AxiosService';
import {
    Contract,
    ContractCreateModel,
    ContractStatusUpdateModel,
    ContractHistory,
    ContractStatistics,
    ContractFilterModel
} from './Models/ContractModels';

@Service()
export default class ContractService {
    constructor(private axiosService: AxiosService) {}

    // Get contracts with filtering
    public async getContracts(filter?: ContractFilterModel): Promise<Contract[]> {
        const params: any = {};

        if (filter) {
            if (filter.type !== undefined && filter.type !== null) {
                params.type = filter.type;
            }
            if (filter.status !== undefined && filter.status !== null) {
                params.status = filter.status;
            }
            if (filter.search) {
                params.search = filter.search;
            }
            if (filter.createdBy) {
                params.createdBy = filter.createdBy;
            }
        }

        const response = await this.axiosService.axiosInstance.get<Contract[]>(
            '/api/contracts',
            { params }
        );

        return response.data;
    }

    // Get contract by ID
    public async getContractById(id: number): Promise<Contract | null> {
        try {
            const response = await this.axiosService.axiosInstance.get<Contract>(
                `/api/contracts/${id}`
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching contract:', error);
            return null;
        }
    }

    // Create new contract
    public async createContract(model: ContractCreateModel, username: string): Promise<Contract> {
        const response = await this.axiosService.axiosInstance.post<Contract>(
            '/api/contracts',
            model
        );

        return response.data;
    }

    // Update contract status
    public async updateContractStatus(model: ContractStatusUpdateModel): Promise<void> {
        await this.axiosService.axiosInstance.put(
            `/api/contracts/${model.contractId}/status`,
            model
        );
    }

    // Get contract history
    public async getContractHistory(contractId: number): Promise<ContractHistory[]> {
        const response = await this.axiosService.axiosInstance.get<ContractHistory[]>(
            `/api/contracts/${contractId}/history`
        );

        return response.data;
    }

    // Get statistics
    public async getStatistics(createdBy?: string): Promise<ContractStatistics> {
        const params: any = {};
        if (createdBy) {
            params.createdBy = createdBy;
        }

        const response = await this.axiosService.axiosInstance.get<ContractStatistics>(
            '/api/contracts/statistics',
            { params }
        );

        return response.data;
    }

    // Delete contract (optional - for admin cleanup)
    public async deleteContract(id: number): Promise<void> {
        await this.axiosService.axiosInstance.delete(`/api/contracts/${id}`);
    }
}
