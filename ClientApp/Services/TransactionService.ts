import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { 
    TransactionVerificationRequest, 
    TransactionVerificationResponse, 
    TransactionLog 
} from '@/models/Transaction';
import { Toaster } from './toast';

@Service()
export default class TransactionService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Simulated transaction verification
    // In production, this would call a real API
    public async verifyTransaction(request: TransactionVerificationRequest): Promise<TransactionVerificationResponse> {
        try {
            this.loaderService.ShowLoader();
            
            // Simulate API delay
            await this.delay(1500);
            
            // Validate source country
            const validCountries = ['jordan', 'ksa', 'الأردن', 'السعودية'];
            const isValidCountry = validCountries.some(country => 
                request.sourceCountry.toLowerCase().includes(country)
            );

            if (!isValidCountry) {
                this.loaderService.HideLoader();
                Toaster.error('البلد المصدر غير مدعوم حالياً. الدول المدعومة: الأردن، السعودية');
                return {
                    isValid: false,
                    status: 'UNSUPPORTED_COUNTRY',
                    message: 'البلد المصدر غير مدعوم',
                    verifiedAt: new Date(),
                    sourceCountry: request.sourceCountry
                };
            }

            // Simulate verification logic
            // In production, this would check against real database/API
            const isValid = Math.random() > 0.2; // 80% success rate for demo
            
            const response: TransactionVerificationResponse = {
                isValid,
                status: isValid ? 'VERIFIED' : 'FAILED',
                message: isValid 
                    ? 'تم التحقق من المعاملة بنجاح' 
                    : 'فشل التحقق من المعاملة',
                verifiedAt: new Date(),
                sourceCountry: request.sourceCountry,
                transactionDetails: {
                    transactionId: request.transactionId,
                    amount: request.amount,
                    senderName: request.senderName,
                    recipientName: request.recipientName
                }
            };

            // Log the transaction
            await this.logTransaction({
                transactionId: request.transactionId,
                amount: request.amount,
                sourceCountry: request.sourceCountry,
                verificationStatus: response.status,
                isValid: response.isValid
            });

            this.loaderService.HideLoader();
            
            if (isValid) {
                Toaster.success('تم التحقق من المعاملة بنجاح');
            } else {
                Toaster.error('فشل التحقق من المعاملة');
            }

            return response;
        } catch (error) {
            this.loaderService.HideLoader();
            Toaster.error('حدث خطأ أثناء التحقق من المعاملة');
            throw error;
        }
    }

    // Log transaction search
    private async logTransaction(data: Partial<TransactionLog>): Promise<void> {
        try {
            // Get existing logs from localStorage
            const logs = this.getTransactionLogs();
            
            // Create new log entry
            const newLog: TransactionLog = {
                id: logs.length + 1,
                transactionId: data.transactionId || '',
                amount: data.amount || 0,
                sourceCountry: data.sourceCountry || '',
                searchedBy: 'Current User', // In production, get from auth context
                searchedAt: new Date(),
                verificationStatus: data.verificationStatus || 'UNKNOWN',
                isValid: data.isValid || false
            };

            // Add to logs
            logs.unshift(newLog);

            // Keep only last 100 logs
            const trimmedLogs = logs.slice(0, 100);

            // Save to localStorage
            localStorage.setItem('transactionLogs', JSON.stringify(trimmedLogs));
        } catch (error) {
            console.error('Error logging transaction:', error);
        }
    }

    // Get all transaction logs
    public getTransactionLogs(): TransactionLog[] {
        try {
            const logsJson = localStorage.getItem('transactionLogs');
            if (!logsJson) {
                return [];
            }
            const logs = JSON.parse(logsJson);
            // Convert searchedAt back to Date objects
            return logs.map((log: any) => ({
                ...log,
                searchedAt: new Date(log.searchedAt)
            }));
        } catch (error) {
            console.error('Error reading transaction logs:', error);
            return [];
        }
    }

    // Clear all logs
    public clearLogs(): void {
        localStorage.removeItem('transactionLogs');
        Toaster.success('تم مسح جميع السجلات');
    }

    // Utility function for delay
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get supported countries
    public getSupportedCountries(): Array<{value: string, text: string}> {
        return [
            { value: 'jordan', text: '🇯🇴 الأردن' },
            { value: 'ksa', text: '🇸🇦 المملكة العربية السعودية' }
        ];
    }
}
