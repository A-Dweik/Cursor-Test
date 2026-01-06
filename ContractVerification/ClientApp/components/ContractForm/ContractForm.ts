import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './ContractForm.html';
import ContractService from '@/Services/Contract/ContractService';
import ContractModel, { ContractType, ContractCategory, ContractStatus } from '@/Services/Contract/Models/ContractModel';

@WithRender
@Component({})
export default class ContractForm extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public contract: ContractModel = this.getEmptyContract();
    public loading: boolean = false;
    public valid: boolean = false;
    public isEditMode: boolean = false;

    public typeOptions = [
        { value: ContractType.RealEstate, text: 'عقار', icon: 'mdi-home' },
        { value: ContractType.Vehicle, text: 'مركبة', icon: 'mdi-car' },
        { value: ContractType.Commercial, text: 'تجاري', icon: 'mdi-briefcase' }
    ];

    public categoryOptions = [
        { value: ContractCategory.Sale, text: 'بيع' },
        { value: ContractCategory.Purchase, text: 'شراء' },
        { value: ContractCategory.Rent, text: 'إيجار' },
        { value: ContractCategory.Lease, text: 'تأجير' }
    ];

    public rules = {
        required: (value: any) => !!value || 'هذا الحقل مطلوب',
        minLength: (min: number) => (value: string) =>
            (value && value.length >= min) || `الحد الأدنى ${min} أحرف`,
        idNumber: (value: string) =>
            /^\d{10}$/.test(value) || 'يجب أن يتكون رقم الهوية من 10 أرقام',
        positiveNumber: (value: number) =>
            (value && value > 0) || 'يجب أن تكون القيمة أكبر من صفر'
    };

    public async mounted() {
        const contractId = this.$route.params.id;
        if (contractId && contractId !== 'new') {
            this.isEditMode = true;
            await this.loadContract(contractId);
        }
    }

    public async loadContract(id: string) {
        this.loading = true;
        const contract = await this.contractService.getContractById(id);
        if (contract) {
            this.contract = contract;
        } else {
            this.$router.push('/contracts');
        }
        this.loading = false;
    }

    public getEmptyContract(): ContractModel {
        return {
            id: '',
            contractNumber: this.generateContractNumber(),
            contractType: ContractType.RealEstate,
            contractCategory: ContractCategory.Sale,
            partyAName: '',
            partyAId: '',
            partyBName: '',
            partyBId: '',
            propertyDescription: '',
            propertyValue: 0,
            contractDate: new Date().toISOString().substr(0, 10),
            status: ContractStatus.Pending,
            notes: '',
            createdDate: ''
        };
    }

    public generateContractNumber(): string {
        const date = new Date();
        const year = date.getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `CT-${year}-${random}`;
    }

    public async submit() {
        const form = this.$refs.form as any;
        if (form.validate()) {
            let success = false;
            if (this.isEditMode) {
                success = await this.contractService.updateContract(this.contract);
            } else {
                success = await this.contractService.createContract(this.contract);
            }

            if (success) {
                this.$router.push('/contracts');
            }
        }
    }

    public cancel() {
        this.$router.push('/contracts');
    }

    public get pageTitle(): string {
        return this.isEditMode ? 'تعديل العقد' : 'إضافة عقد جديد';
    }

    public get submitButtonText(): string {
        return this.isEditMode ? 'تحديث العقد' : 'إضافة العقد';
    }
}
