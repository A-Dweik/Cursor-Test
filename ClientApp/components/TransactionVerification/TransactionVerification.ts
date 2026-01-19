import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './TransactionVerification.html';
import TransactionService from '@/Services/TransactionService';
import { 
    TransactionVerificationRequest, 
    TransactionVerificationResponse 
} from '@/models/Transaction';

@WithRender
@Component({})
export default class TransactionVerification extends Vue {
    @Inject(TransactionService) public transactionService!: TransactionService;

    public valid: boolean = false;
    public loading: boolean = false;
    public verificationResult: TransactionVerificationResponse | null = null;
    public showResult: boolean = false;

    // Form data
    public transactionId: string = '';
    public amount: number | null = null;
    public sourceCountry: string = '';
    public senderName: string = '';
    public recipientName: string = '';

    // Form validation rules
    public rules = {
        required: (value: any) => !!value || 'هذا الحقل مطلوب',
        transactionId: (value: string) => {
            if (!value) return 'رقم المعاملة مطلوب';
            if (value.length < 5) return 'رقم المعاملة يجب أن يكون 5 أحرف على الأقل';
            return true;
        },
        amount: (value: number) => {
            if (!value) return 'المبلغ مطلوب';
            if (value <= 0) return 'المبلغ يجب أن يكون أكبر من صفر';
            return true;
        },
        name: (value: string) => {
            if (!value) return 'الاسم مطلوب';
            if (value.length < 3) return 'الاسم يجب أن يكون 3 أحرف على الأقل';
            return true;
        }
    };

    public get supportedCountries() {
        return this.transactionService.getSupportedCountries();
    }

    public async verifyTransaction() {
        // Validate form
        const form = this.$refs.verificationForm as any;
        if (!form.validate()) {
            return;
        }

        this.loading = true;
        this.showResult = false;

        try {
            const request: TransactionVerificationRequest = {
                transactionId: this.transactionId,
                amount: this.amount!,
                sourceCountry: this.sourceCountry,
                senderName: this.senderName,
                recipientName: this.recipientName
            };

            const result = await this.transactionService.verifyTransaction(request);
            this.verificationResult = result;
            this.showResult = true;
        } catch (error) {
            console.error('Verification error:', error);
        } finally {
            this.loading = false;
        }
    }

    public resetForm() {
        const form = this.$refs.verificationForm as any;
        form.reset();
        this.showResult = false;
        this.verificationResult = null;
    }

    public viewLogs() {
        this.$router.push('/logs');
    }

    public getStatusColor(status: string): string {
        switch (status) {
            case 'VERIFIED': return 'success';
            case 'FAILED': return 'error';
            case 'UNSUPPORTED_COUNTRY': return 'warning';
            default: return 'grey';
        }
    }

    public getStatusIcon(status: string): string {
        switch (status) {
            case 'VERIFIED': return 'mdi-check-circle';
            case 'FAILED': return 'mdi-close-circle';
            case 'UNSUPPORTED_COUNTRY': return 'mdi-alert-circle';
            default: return 'mdi-help-circle';
        }
    }
}
