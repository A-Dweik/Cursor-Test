import { Component, Vue } from 'vue-property-decorator';
import WithRender from './ContractForm.html';
import { Inject } from 'vue-di-container';
import ContractService from '@/Services/ContractService';
import { ContractModel } from '@/Models/ContractModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class ContractForm extends Vue {
    @Inject(ContractService) public contractService!: ContractService;

    public valid: boolean = false;
    public loading: boolean = false;
    public isEditMode: boolean = false;
    public contractId: string = '';

    public contract: Partial<ContractModel> = {
        contractNumber: '',
        contractDate: new Date().toISOString().substr(0, 10),
        contractType: 'sale',
        assetType: 'car',
        assetName: '',
        assetDetails: '',
        firstPartyName: '',
        firstPartyId: '',
        firstPartyPhone: '',
        secondPartyName: '',
        secondPartyId: '',
        secondPartyPhone: '',
        amount: 0,
        paymentMethod: 'نقدي',
        duration: '',
        startDate: '',
        endDate: '',
        notes: '',
        status: 'active',
    };

    public rules = {
        required: (value: any) => !!value || 'هذا الحقل مطلوب',
        number: (value: any) => !isNaN(Number(value)) || 'يجب أن يكون رقم',
        minAmount: (value: any) => (Number(value) > 0) || 'يجب أن يكون أكبر من صفر',
        saudiId: (value: string) => {
            if (!value) return 'هذا الحقل مطلوب';
            if (value.length !== 10) return 'يجب أن يكون 10 أرقام';
            if (!/^\d+$/.test(value)) return 'يجب أن يحتوي على أرقام فقط';
            return true;
        },
        phone: (value: string) => {
            if (!value) return 'هذا الحقل مطلوب';
            if (!/^05\d{8}$/.test(value)) return 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05)';
            return true;
        },
    };

    public contractTypes = [
        { text: 'بيع', value: 'sale' },
        { text: 'تأجير', value: 'rental' },
    ];

    public assetTypes = [
        { text: 'سيارة', value: 'car' },
        { text: 'منزل', value: 'house' },
    ];

    public paymentMethods = [
        'نقدي',
        'تحويل بنكي',
        'شيك',
        'تمويل عقاري',
        'تقسيط',
    ];

    public statusOptions = [
        { text: 'نشط', value: 'active' },
        { text: 'مكتمل', value: 'completed' },
        { text: 'ملغي', value: 'cancelled' },
    ];

    public mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.isEditMode = true;
            this.contractId = id;
            this.loadContract(id);
        } else {
            this.contract.contractNumber = this.contractService.generateContractNumber();
        }
    }

    private loadContract(id: string) {
        this.loading = true;
        const existingContract = this.contractService.getContractById(id);
        
        if (existingContract) {
            this.contract = { ...existingContract };
        } else {
            Toaster.error('العقد غير موجود');
            this.$router.push({ name: 'contracts' });
        }
        
        this.loading = false;
    }

    public async submit() {
        const form = this.$refs.form as any;
        if (!form.validate()) {
            Toaster.error('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح');
            return;
        }

        this.loading = true;

        try {
            if (this.isEditMode) {
                const updated = this.contractService.updateContract(
                    this.contractId,
                    this.contract as ContractModel
                );
                if (updated) {
                    Toaster.success('تم تحديث العقد بنجاح');
                    this.$router.push({ name: 'contract-view', params: { id: this.contractId } });
                } else {
                    Toaster.error('فشل تحديث العقد');
                }
            } else {
                const newContract = this.contractService.addContract(
                    this.contract as Omit<ContractModel, 'id' | 'createdDate' | 'updatedDate'>
                );
                Toaster.success('تم إضافة العقد بنجاح');
                this.$router.push({ name: 'contract-view', params: { id: newContract.id } });
            }
        } catch (error) {
            Toaster.error('حدث خطأ أثناء حفظ العقد');
        } finally {
            this.loading = false;
        }
    }

    public cancel() {
        this.$router.back();
    }

    public get isRentalContract(): boolean {
        return this.contract.contractType === 'rental';
    }
}
