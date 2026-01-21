import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import WorkflowService from '@/Services/WorkflowService';
import { WorkflowStatus, ContractModel, WorkflowHistory } from '@/Models/WorkflowStatus';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    @Inject(WorkflowService) public workflowService!: WorkflowService;
    
    public contracts: ContractModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedFilter: string = 'all';
    public selectedWorkflowFilter: string = 'all';
    
    public mounted() {
        this.loadContracts();
    }

    public loadContracts() {
        this.loading = true;
        // Simulated contract data with workflow stages
        setTimeout(() => {
            this.contracts = [
                {
                    id: 1,
                    type: 'sale',
                    propertyType: 'فيلا',
                    location: 'الرياض - حي النرجس',
                    price: '2,500,000 ريال',
                    seller: 'محمد أحمد العلي',
                    buyer: 'خالد سعد المطيري',
                    workflowStatus: WorkflowStatus.Submitted,
                    date: '2026-01-15',
                    contractNumber: 'CV-2026-001',
                    workflowHistory: []
                },
                {
                    id: 2,
                    type: 'rental',
                    propertyType: 'شقة',
                    location: 'جدة - حي الروضة',
                    price: '3,500 ريال/شهرياً',
                    owner: 'سعد عبدالله الغامدي',
                    tenant: 'أحمد علي الزهراني',
                    workflowStatus: WorkflowStatus.InitialApproved,
                    date: '2026-01-12',
                    contractNumber: 'CR-2026-045',
                    workflowHistory: [
                        { stage: WorkflowStatus.Submitted, action: 'approved', by: 'مراجع أول', date: '2026-01-12' }
                    ]
                },
                {
                    id: 3,
                    type: 'sale',
                    propertyType: 'أرض سكنية',
                    location: 'الدمام - حي الفيصلية',
                    price: '1,200,000 ريال',
                    seller: 'فهد محمد القحطاني',
                    buyer: 'عبدالرحمن سليمان الدوسري',
                    workflowStatus: WorkflowStatus.FinalApproved,
                    date: '2026-01-10',
                    contractNumber: 'CV-2026-002',
                    workflowHistory: [
                        { stage: WorkflowStatus.Submitted, action: 'approved', by: 'مراجع أول', date: '2026-01-10' },
                        { stage: WorkflowStatus.InitialApproved, action: 'approved', by: 'مدير الإدارة', date: '2026-01-10' },
                        { stage: WorkflowStatus.ManagerApproved, action: 'approved', by: 'الموافقة النهائية', date: '2026-01-10' }
                    ]
                },
                {
                    id: 4,
                    type: 'rental',
                    propertyType: 'مكتب تجاري',
                    location: 'الرياض - حي العليا',
                    price: '8,000 ريال/شهرياً',
                    owner: 'شركة العقارات المتقدمة',
                    tenant: 'مؤسسة التقنية الحديثة',
                    workflowStatus: WorkflowStatus.Rejected,
                    date: '2026-01-08',
                    contractNumber: 'CR-2026-046',
                    workflowHistory: [
                        { stage: WorkflowStatus.Submitted, action: 'rejected', by: 'مراجع أول', date: '2026-01-08', notes: 'بيانات ناقصة' }
                    ]
                },
                {
                    id: 5,
                    type: 'sale',
                    propertyType: 'عمارة سكنية',
                    location: 'مكة المكرمة - حي العزيزية',
                    price: '5,800,000 ريال',
                    seller: 'ناصر عبدالعزيز الشهري',
                    buyer: 'مجموعة الاستثمار العقاري',
                    workflowStatus: WorkflowStatus.ManagerApproved,
                    date: '2026-01-18',
                    contractNumber: 'CV-2026-003',
                    workflowHistory: [
                        { stage: WorkflowStatus.Submitted, action: 'approved', by: 'مراجع أول', date: '2026-01-18' },
                        { stage: WorkflowStatus.InitialApproved, action: 'approved', by: 'مدير الإدارة', date: '2026-01-18' }
                    ]
                },
                {
                    id: 6,
                    type: 'rental',
                    propertyType: 'محل تجاري',
                    location: 'الخبر - حي الكورنيش',
                    price: '4,200 ريال/شهرياً',
                    owner: 'عبدالله حسن العتيبي',
                    tenant: 'مؤسسة التجارة الحديثة',
                    workflowStatus: WorkflowStatus.Submitted,
                    date: '2026-01-05',
                    contractNumber: 'CR-2026-047',
                    workflowHistory: []
                }
            ];
            this.loading = false;
        }, 500);
    }

    public get filteredContracts() {
        let filtered = this.contracts;

        // Filter by contract type (sale/rental)
        if (this.selectedFilter !== 'all') {
            filtered = filtered.filter(c => c.type === this.selectedFilter);
        }

        // Filter by workflow status
        if (this.selectedWorkflowFilter !== 'all') {
            filtered = filtered.filter(c => c.workflowStatus === this.selectedWorkflowFilter);
        }

        // Search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(c => 
                c.contractNumber.toLowerCase().includes(query) ||
                c.location.toLowerCase().includes(query) ||
                c.propertyType.toLowerCase().includes(query)
            );
        }

        return filtered;
    }

    public selectFilter(filter: string) {
        this.selectedFilter = filter;
    }

    public viewContract(contract: ContractModel) {
        alert(`عرض تفاصيل العقد: ${contract.contractNumber}\n\nحالة سير العمل: ${this.getWorkflowStatusText(contract.workflowStatus)}`);
    }

    public approveContract(contract: ContractModel) {
        const nextStage = this.workflowService.getNextStage(contract.workflowStatus);
        if (nextStage) {
            const currentStageText = this.getWorkflowStatusText(contract.workflowStatus);
            const nextStageText = this.getWorkflowStatusText(nextStage);
            
            // Add to history
            const historyEntry: WorkflowHistory = {
                stage: contract.workflowStatus,
                action: 'approved',
                by: this.getCurrentUserRole(contract.workflowStatus),
                date: new Date().toISOString().split('T')[0]
            };
            contract.workflowHistory.push(historyEntry);
            
            // Update status
            contract.workflowStatus = nextStage;
            alert(`تمت الموافقة على العقد: ${contract.contractNumber}\n\nانتقل من: ${currentStageText}\nإلى: ${nextStageText}`);
        }
    }

    public rejectContract(contract: ContractModel) {
        if (this.workflowService.canReject(contract.workflowStatus)) {
            const currentStageText = this.getWorkflowStatusText(contract.workflowStatus);
            
            // Add to history
            const historyEntry: WorkflowHistory = {
                stage: contract.workflowStatus,
                action: 'rejected',
                by: this.getCurrentUserRole(contract.workflowStatus),
                date: new Date().toISOString().split('T')[0],
                notes: 'تم الرفض من قبل المسؤول'
            };
            contract.workflowHistory.push(historyEntry);
            
            contract.workflowStatus = WorkflowStatus.Rejected;
            alert(`تم رفض العقد: ${contract.contractNumber}\n\nمن المرحلة: ${currentStageText}`);
        }
    }

    public getCurrentUserRole(status: WorkflowStatus): string {
        switch (status) {
            case WorkflowStatus.Submitted:
                return 'مراجع أول';
            case WorkflowStatus.InitialApproved:
                return 'مدير الإدارة';
            case WorkflowStatus.ManagerApproved:
                return 'الموافقة النهائية';
            default:
                return 'مسؤول';
        }
    }

    public getWorkflowStatusText(status: WorkflowStatus): string {
        const stage = this.workflowService.getStageByStatus(status);
        return stage ? stage.labelAr : status;
    }

    public getWorkflowStatusClasses(status: WorkflowStatus): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case WorkflowStatus.FinalApproved:
                return `${baseClasses} status--green`;
            case WorkflowStatus.Submitted:
                return `${baseClasses} status--blue`;
            case WorkflowStatus.InitialApproved:
            case WorkflowStatus.ManagerApproved:
                return `${baseClasses} status--orange`;
            case WorkflowStatus.Rejected:
                return `${baseClasses} status--red`;
            default:
                return baseClasses;
        }
    }

    public canApprove(contract: ContractModel): boolean {
        return this.workflowService.canApprove(contract.workflowStatus);
    }

    public canReject(contract: ContractModel): boolean {
        return this.workflowService.canReject(contract.workflowStatus);
    }

    public getApprovalButtonText(contract: ContractModel): string {
        return this.workflowService.getApprovalButtonText(contract.workflowStatus);
    }

    public getProgressPercentage(contract: ContractModel): number {
        return this.workflowService.getProgressPercentage(contract.workflowStatus);
    }

    public getContractTypeText(type: string): string {
        return type === 'sale' ? 'عقد بيع' : 'عقد إيجار';
    }

    public getCategoryIcon(type: string): string {
        return type === 'sale' ? 'icon-document' : 'icon-building';
    }

    public get saleContractsCount(): number {
        return this.contracts.filter(c => c.type === 'sale').length;
    }

    public get rentalContractsCount(): number {
        return this.contracts.filter(c => c.type === 'rental').length;
    }

    public get submittedCount(): number {
        return this.contracts.filter(c => c.workflowStatus === WorkflowStatus.Submitted).length;
    }

    public get initialApprovedCount(): number {
        return this.contracts.filter(c => c.workflowStatus === WorkflowStatus.InitialApproved).length;
    }

    public get managerApprovedCount(): number {
        return this.contracts.filter(c => c.workflowStatus === WorkflowStatus.ManagerApproved).length;
    }

    public get finalApprovedCount(): number {
        return this.contracts.filter(c => c.workflowStatus === WorkflowStatus.FinalApproved).length;
    }

    public selectWorkflowFilter(filter: string) {
        this.selectedWorkflowFilter = filter;
    }
}
