import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './TransactionLog.html';
import TransactionService from '@/Services/TransactionService';
import { TransactionLog as TxLog } from '@/models/Transaction';

@WithRender
@Component({})
export default class TransactionLog extends Vue {
    @Inject(TransactionService) public transactionService!: TransactionService;

    public logs: TxLog[] = [];
    public loading: boolean = false;
    public search: string = '';
    public headers = [
        { text: 'رقم المعاملة', value: 'transactionId', align: 'right' },
        { text: 'المبلغ', value: 'amount', align: 'right' },
        { text: 'البلد المصدر', value: 'sourceCountry', align: 'right' },
        { text: 'الحالة', value: 'verificationStatus', align: 'center' },
        { text: 'تاريخ البحث', value: 'searchedAt', align: 'right' },
        { text: 'بواسطة', value: 'searchedBy', align: 'right' }
    ];

    public mounted() {
        this.loadLogs();
    }

    public loadLogs() {
        this.loading = true;
        try {
            this.logs = this.transactionService.getTransactionLogs();
        } finally {
            this.loading = false;
        }
    }

    public clearAllLogs() {
        if (confirm('هل أنت متأكد من مسح جميع السجلات؟')) {
            this.transactionService.clearLogs();
            this.loadLogs();
        }
    }

    public getStatusColor(status: string): string {
        switch (status) {
            case 'VERIFIED': return 'green';
            case 'FAILED': return 'red';
            case 'UNSUPPORTED_COUNTRY': return 'orange';
            default: return 'blue';
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'VERIFIED': return 'موثق';
            case 'FAILED': return 'فشل';
            case 'UNSUPPORTED_COUNTRY': return 'بلد غير مدعوم';
            default: return 'غير معروف';
        }
    }

    public formatDate(date: Date): string {
        return new Date(date).toLocaleString('ar-SA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    public newVerification() {
        this.$router.push('/verify');
    }

    public goHome() {
        this.$router.push('/');
    }

    public exportLogs() {
        // Simple CSV export
        const csvContent = [
            ['رقم المعاملة', 'المبلغ', 'البلد المصدر', 'الحالة', 'تاريخ البحث', 'بواسطة'].join(','),
            ...this.logs.map(log => [
                log.transactionId,
                log.amount,
                log.sourceCountry,
                this.getStatusText(log.verificationStatus),
                this.formatDate(log.searchedAt),
                log.searchedBy
            ].join(','))
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `transaction_logs_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
