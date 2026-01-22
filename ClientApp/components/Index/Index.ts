import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './IndexPage.html';
import ContractService from '@/Services/ContractService';
import UserService from '@/shared/userService/UserService';
import RoleService from '@/shared/userService/RoleService';
import WorkflowService from '@/Services/WorkflowService';
import { Toaster } from '@/Services/toast';
import {
    Contract,
    ContractCreateModel,
    ContractStatusUpdateModel,
    ContractHistory,
    ContractStatistics,
    ContractFilterModel,
    ContractType,
    ContractStatus
} from '@/Services/Models/ContractModels';

interface NewContractForm {
    contractNumber: string;
    type: ContractType;
    sellerName: string;
    sellerIdNumber: string;
    buyerName: string;
    buyerIdNumber: string;
    propertyAddress: string;
    contractAmount: string;
}

@WithRender
@Component({
    components: {},
})
export default class Index extends Vue {
    // Services
    @Inject(ContractService) private contractService!: ContractService;
    @Inject(UserService) private userService!: UserService;
    @Inject(RoleService) private roleService!: RoleService;
    @Inject(WorkflowService) private workflowService!: WorkflowService;

    // Data
    public contracts: Contract[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedTypeFilter: ContractType | null = null;
    public selectedStatusFilter: ContractStatus | null = null;

    // User info
    public currentUser: string = '';
    public isAdmin: boolean = false;

    // Modal states
    public showDetailModal: boolean = false;
    public showAddModal: boolean = false;
    public showHistoryModal: boolean = false;
    public showConfirmModal: boolean = false;
    public selectedContract: Contract | null = null;
    public contractHistory: ContractHistory[] = [];
    public confirmAction: 'verify' | 'reject' | null = null;
    public confirmComment: string = '';

    // Form data
    public newContract: NewContractForm = this.getEmptyForm();
    public formErrors: { [key: string]: string } = {};
    public submitting: boolean = false;

    // Statistics
    public statistics: ContractStatistics = {
        totalContracts: 0,
        submittedContracts: 0,
        initialApprovedContracts: 0,
        managerApprovedContracts: 0,
        finalApprovedContracts: 0,
        rejectedContracts: 0
    };

    // Enums for template
    public ContractType = ContractType;
    public ContractStatus = ContractStatus;

    public async created() {
        await this.initializeUser();
    }

    public async mounted() {
        document.title = 'SigmaS | تثبيت عقود بيع وإيجار العقارات';
        await this.loadData();
    }

    private async initializeUser() {
        try {
            const user = await this.userService.getUser();
            this.currentUser = user && user.username ? user.username : 'test';
            this.isAdmin = await this.roleService.isAdmin();

            console.log('User initialized:', { username: this.currentUser, isAdmin: this.isAdmin });
        } catch (error) {
            console.error('Error loading user info:', error);
            // Fallback to default test user if UserInfo fails
            this.currentUser = 'test';
            this.isAdmin = false;
        }
    }

    private async loadData() {
        await Promise.all([
            this.loadContracts(),
            this.loadStatistics()
        ]);
    }

    public async loadContracts() {
        this.loading = true;
        try {
            const filter: ContractFilterModel = {
                search: this.searchQuery || undefined,
                type: this.selectedTypeFilter || undefined,
                status: this.selectedStatusFilter || undefined,
                // Non-admins only see their own contracts
                createdBy: this.isAdmin ? undefined : (this.currentUser || undefined)
            };

            this.contracts = await this.contractService.getContracts(filter);
        } catch (error) {
            console.error('Error loading contracts:', error);
            Toaster.error('حدث خطأ أثناء تحميل العقود');
        } finally {
            this.loading = false;
        }
    }

    public async loadStatistics() {
        try {
            const createdBy = this.isAdmin ? undefined : (this.currentUser || undefined);
            this.statistics = await this.contractService.getStatistics(createdBy);
        } catch (error) {
            console.error('Error loading statistics:', error);
            Toaster.error('حدث خطأ أثناء تحميل الإحصائيات');
        }
    }

    public getEmptyForm(): NewContractForm {
        return {
            contractNumber: this.generateContractNumber(),
            type: ContractType.Sale,
            sellerName: '',
            sellerIdNumber: '',
            buyerName: '',
            buyerIdNumber: '',
            propertyAddress: '',
            contractAmount: ''
        };
    }

    private generateContractNumber(): string {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 999) + 1;
        return `CV-${year}-${String(random).padStart(3, '0')}`;
    }

    // Search and filter
    public async onSearchChange() {
        await this.loadContracts();
    }

    public async selectTypeFilter(type: ContractType | null) {
        this.selectedTypeFilter = type;
        await this.loadContracts();
    }

    public async selectStatusFilter(status: ContractStatus | null) {
        this.selectedStatusFilter = status;
        await this.loadContracts();
    }

    // Statistics computed properties
    public get totalContracts(): number {
        return this.statistics && this.statistics.totalContracts ? this.statistics.totalContracts : 0;
    }

    public get submittedContracts(): number {
        return this.statistics && this.statistics.submittedContracts ? this.statistics.submittedContracts : 0;
    }

    public get initialApprovedContracts(): number {
        return this.statistics && this.statistics.initialApprovedContracts ? this.statistics.initialApprovedContracts : 0;
    }

    public get managerApprovedContracts(): number {
        return this.statistics && this.statistics.managerApprovedContracts ? this.statistics.managerApprovedContracts : 0;
    }

    public get finalApprovedContracts(): number {
        return this.statistics && this.statistics.finalApprovedContracts ? this.statistics.finalApprovedContracts : 0;
    }

    public get rejectedContracts(): number {
        return this.statistics && this.statistics.rejectedContracts ? this.statistics.rejectedContracts : 0;
    }

    public get filteredContracts(): Contract[] {
        return this.contracts;
    }

    // Modal handlers
    public openDetailModal(contract: Contract) {
        this.selectedContract = contract;
        this.showDetailModal = true;
    }

    public closeDetailModal() {
        this.showDetailModal = false;
        this.selectedContract = null;
    }

    public openAddModal() {
        this.newContract = this.getEmptyForm();
        this.formErrors = {};
        this.showAddModal = true;
    }

    public closeAddModal() {
        this.showAddModal = false;
        this.newContract = this.getEmptyForm();
        this.formErrors = {};
    }

    public async openHistoryModal(contract: Contract) {
        this.selectedContract = contract;
        this.showHistoryModal = true;
        try {
            this.contractHistory = await this.contractService.getContractHistory(contract.id);
        } catch (error) {
            console.error('Error loading history:', error);
            Toaster.error('حدث خطأ أثناء تحميل سجل العقد');
        }
    }

    public closeHistoryModal() {
        this.showHistoryModal = false;
        this.selectedContract = null;
        this.contractHistory = [];
    }

    public openConfirmModal(contract: Contract, action: 'verify' | 'reject') {
        this.selectedContract = contract;
        this.confirmAction = action;
        this.confirmComment = '';
        this.showConfirmModal = true;
    }

    public closeConfirmModal() {
        this.showConfirmModal = false;
        this.selectedContract = null;
        this.confirmAction = null;
        this.confirmComment = '';
    }

    // Actions
    public async confirmActionExecute() {
        if (!this.selectedContract || !this.confirmAction) return;

        try {
            const newStatus = this.confirmAction === 'verify'
                ? this.getNextStatus(this.selectedContract!.status) || ContractStatus.FinalApproved
                : ContractStatus.Rejected;

            const updateModel: ContractStatusUpdateModel = {
                contractId: this.selectedContract.id,
                newStatus: newStatus,
                changedBy: this.currentUser,
                comment: this.confirmComment
            };

            await this.contractService.updateContractStatus(updateModel);

            const successMessage = this.confirmAction === 'verify'
                ? 'تم تثبيت العقد بنجاح'
                : 'تم رفض العقد بنجاح';
            Toaster.success(successMessage);

            this.closeConfirmModal();
            await this.loadData();
        } catch (error) {
            console.error('Error updating contract status:', error);
            Toaster.error('حدث خطأ أثناء تحديث حالة العقد');
        }
    }

    public validateForm(): boolean {
        this.formErrors = {};
        let isValid = true;

        if (!this.newContract.contractNumber) {
            this.formErrors.contractNumber = 'يرجى إدخال رقم العقد';
            isValid = false;
        }

        if (!this.newContract.sellerName.trim()) {
            this.formErrors.sellerName = 'يرجى إدخال اسم البائع/المالك';
            isValid = false;
        }

        if (!this.newContract.sellerIdNumber.trim()) {
            this.formErrors.sellerIdNumber = 'يرجى إدخال رقم هوية البائع/المالك';
            isValid = false;
        } else if (this.newContract.sellerIdNumber.trim().length !== 10) {
            this.formErrors.sellerIdNumber = 'رقم الهوية يجب أن يكون 10 أرقام';
            isValid = false;
        }

        if (!this.newContract.buyerName.trim()) {
            this.formErrors.buyerName = 'يرجى إدخال اسم المشتري/المستأجر';
            isValid = false;
        }

        if (!this.newContract.buyerIdNumber.trim()) {
            this.formErrors.buyerIdNumber = 'يرجى إدخال رقم هوية المشتري/المستأجر';
            isValid = false;
        } else if (this.newContract.buyerIdNumber.trim().length !== 10) {
            this.formErrors.buyerIdNumber = 'رقم الهوية يجب أن يكون 10 أرقام';
            isValid = false;
        }

        if (!this.newContract.propertyAddress.trim()) {
            this.formErrors.propertyAddress = 'يرجى إدخال عنوان العقار';
            isValid = false;
        }

        if (!this.newContract.contractAmount || parseFloat(this.newContract.contractAmount) <= 0) {
            this.formErrors.contractAmount = 'يرجى إدخال مبلغ صحيح';
            isValid = false;
        }

        return isValid;
    }

    public async submitNewContract() {
        if (!this.validateForm()) return;

        this.submitting = true;
        try {
            const createModel: ContractCreateModel = {
                contractNumber: this.newContract.contractNumber,
                type: this.newContract.type,
                sellerName: this.newContract.sellerName,
                sellerIdNumber: this.newContract.sellerIdNumber,
                buyerName: this.newContract.buyerName,
                buyerIdNumber: this.newContract.buyerIdNumber,
                propertyAddress: this.newContract.propertyAddress,
                contractAmount: parseFloat(this.newContract.contractAmount)
            };

            await this.contractService.createContract(createModel, this.currentUser);

            Toaster.success('تم إضافة العقد بنجاح');
            this.closeAddModal();
            await this.loadData();
        } catch (error) {
            console.error('Error creating contract:', error);
            Toaster.error('حدث خطأ أثناء إضافة العقد');
        } finally {
            this.submitting = false;
        }
    }

    public printContract() {
        window.print();
    }

    // Helper methods
    public getStatusText(status: ContractStatus): string {
        switch (status) {
            case ContractStatus.Submitted: return 'مقدم للمراجعة';
            case ContractStatus.InitialApproved: return 'الموافقة الأولية';
            case ContractStatus.ManagerApproved: return 'موافقة المدير';
            case ContractStatus.FinalApproved: return 'الموافقة النهائية';
            case ContractStatus.Rejected: return 'مرفوض';
            default: return '';
        }
    }

    public getStatusClasses(status: ContractStatus): string {
        const baseClasses = 'contract-status';
        switch (status) {
            case ContractStatus.FinalApproved: return `${baseClasses} contract-status--verified`;
            case ContractStatus.Submitted: return `${baseClasses} contract-status--submitted`;
            case ContractStatus.InitialApproved: return `${baseClasses} contract-status--pending`;
            case ContractStatus.ManagerApproved: return `${baseClasses} contract-status--pending`;
            case ContractStatus.Rejected: return `${baseClasses} contract-status--rejected`;
            default: return baseClasses;
        }
    }

    public getContractTypeText(type: ContractType): string {
        return type === ContractType.Sale ? 'عقد بيع' : 'عقد إيجار';
    }

    public getContractTypeIcon(type: ContractType): string {
        return type === ContractType.Sale ? 'mdi-home-currency-usd' : 'mdi-home-city';
    }

    public formatDate(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    public formatCurrency(amount: number): string {
        return new Intl.NumberFormat('ar-SA', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount) + ' ريال';
    }

    // Check if user can perform admin actions
    public canApprove(contract: Contract): boolean {
        return this.isAdmin &&
               (contract.status === ContractStatus.Submitted ||
                contract.status === ContractStatus.InitialApproved ||
                contract.status === ContractStatus.ManagerApproved);
    }

    // Get the next workflow status
    public getNextStatus(currentStatus: ContractStatus): ContractStatus | null {
        switch (currentStatus) {
            case ContractStatus.Submitted:
                return ContractStatus.InitialApproved;
            case ContractStatus.InitialApproved:
                return ContractStatus.ManagerApproved;
            case ContractStatus.ManagerApproved:
                return ContractStatus.FinalApproved;
            default:
                return null;
        }
    }

    // Get approval button text based on current stage
    public getApprovalButtonText(status: ContractStatus): string {
        switch (status) {
            case ContractStatus.Submitted:
                return 'موافقة أولية';
            case ContractStatus.InitialApproved:
                return 'موافقة المدير';
            case ContractStatus.ManagerApproved:
                return 'الموافقة النهائية';
            default:
                return 'موافقة';
        }
    }

    // Get workflow progress percentage
    public getProgressPercentage(status: ContractStatus): number {
        switch (status) {
            case ContractStatus.Submitted:
                return 25;
            case ContractStatus.InitialApproved:
                return 50;
            case ContractStatus.ManagerApproved:
                return 75;
            case ContractStatus.FinalApproved:
                return 100;
            case ContractStatus.Rejected:
                return 0;
            default:
                return 0;
        }
    }

    // Get current user role based on workflow stage
    public getCurrentUserRole(status: ContractStatus): string {
        switch (status) {
            case ContractStatus.Submitted:
                return 'مراجع أول';
            case ContractStatus.InitialApproved:
                return 'مدير الإدارة';
            case ContractStatus.ManagerApproved:
                return 'الموافقة النهائية';
            default:
                return 'مسؤول';
        }
    }
}
