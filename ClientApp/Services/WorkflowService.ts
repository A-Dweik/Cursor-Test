import { Service } from 'vue-di-container';
import { WorkflowStatus, WorkflowStage } from '@/Models/WorkflowStatus';

/**
 * Workflow Service
 * Manages workflow stages and transitions
 */
@Service()
export default class WorkflowService {
    
    /**
     * Get all workflow stages in order
     */
    public getWorkflowStages(): WorkflowStage[] {
        return [
            {
                status: WorkflowStatus.Submitted,
                label: 'Submitted',
                labelAr: 'مقدم للمراجعة',
                icon: 'mdi-file-document-outline',
                color: '#2196F3',
                order: 1
            },
            {
                status: WorkflowStatus.InitialApproved,
                label: 'Initial Approved',
                labelAr: 'الموافقة الأولية',
                icon: 'mdi-check-circle-outline',
                color: '#1B8354',
                order: 2
            },
            {
                status: WorkflowStatus.ManagerApproved,
                label: 'Manager Approved',
                labelAr: 'موافقة المدير',
                icon: 'mdi-account-check-outline',
                color: '#1B8354',
                order: 3
            },
            {
                status: WorkflowStatus.FinalApproved,
                label: 'Final Approved',
                labelAr: 'الموافقة النهائية',
                icon: 'mdi-check-all',
                color: '#36c5ba',
                order: 4
            },
            {
                status: WorkflowStatus.Rejected,
                label: 'Rejected',
                labelAr: 'مرفوض',
                icon: 'mdi-close-circle',
                color: '#dc2626',
                order: 0
            }
        ];
    }

    /**
     * Get workflow stage by status
     */
    public getStageByStatus(status: WorkflowStatus): WorkflowStage | undefined {
        return this.getWorkflowStages().find(s => s.status === status);
    }

    /**
     * Get next workflow stage
     */
    public getNextStage(currentStatus: WorkflowStatus): WorkflowStatus | null {
        switch (currentStatus) {
            case WorkflowStatus.Submitted:
                return WorkflowStatus.InitialApproved;
            case WorkflowStatus.InitialApproved:
                return WorkflowStatus.ManagerApproved;
            case WorkflowStatus.ManagerApproved:
                return WorkflowStatus.FinalApproved;
            case WorkflowStatus.FinalApproved:
            case WorkflowStatus.Rejected:
                return null;
            default:
                return null;
        }
    }

    /**
     * Check if contract can be approved at current stage
     */
    public canApprove(status: WorkflowStatus): boolean {
        return [
            WorkflowStatus.Submitted,
            WorkflowStatus.InitialApproved,
            WorkflowStatus.ManagerApproved
        ].includes(status);
    }

    /**
     * Check if contract can be rejected
     */
    public canReject(status: WorkflowStatus): boolean {
        return status !== WorkflowStatus.Rejected && 
               status !== WorkflowStatus.FinalApproved;
    }

    /**
     * Get action button text based on current stage
     */
    public getApprovalButtonText(status: WorkflowStatus): string {
        switch (status) {
            case WorkflowStatus.Submitted:
                return 'موافقة أولية';
            case WorkflowStatus.InitialApproved:
                return 'موافقة المدير';
            case WorkflowStatus.ManagerApproved:
                return 'الموافقة النهائية';
            default:
                return 'موافقة';
        }
    }

    /**
     * Get progress percentage
     */
    public getProgressPercentage(status: WorkflowStatus): number {
        switch (status) {
            case WorkflowStatus.Submitted:
                return 25;
            case WorkflowStatus.InitialApproved:
                return 50;
            case WorkflowStatus.ManagerApproved:
                return 75;
            case WorkflowStatus.FinalApproved:
                return 100;
            case WorkflowStatus.Rejected:
                return 0;
            default:
                return 0;
        }
    }
}
