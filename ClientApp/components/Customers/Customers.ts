import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './Customers.html';
import CustomerService from '@/Services/Business/CustomerService';
import { Customer, CustomerInput } from '@/Models/Customer';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class Customers extends Vue {
    @Inject(CustomerService) private customerService!: CustomerService;

    public customers: Customer[] = [];
    public loading: boolean = false;
    public showDialog: boolean = false;
    public editMode: boolean = false;
    public currentCustomer: CustomerInput = this.getEmptyCustomer();
    public editingId: string = '';

    public headers = [
        { text: 'الاسم', value: 'name', sortable: true },
        { text: 'رقم الهاتف', value: 'phone', sortable: false },
        { text: 'البريد الإلكتروني', value: 'email', sortable: false },
        { text: 'العنوان', value: 'address', sortable: false },
        { text: 'إجمالي المشتريات', value: 'totalPurchases', sortable: true },
        { text: 'الرصيد', value: 'balance', sortable: true },
        { text: 'الحالة', value: 'status', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false }
    ];

    public async mounted() {
        await this.loadCustomers();
    }

    private async loadCustomers() {
        this.loading = true;
        try {
            this.customers = await this.customerService.getAllCustomers();
        } catch (error) {
            Toaster.error('فشل تحميل العملاء');
        } finally {
            this.loading = false;
        }
    }

    public openAddDialog() {
        this.editMode = false;
        this.currentCustomer = this.getEmptyCustomer();
        this.showDialog = true;
    }

    public openEditDialog(customer: Customer) {
        this.editMode = true;
        this.editingId = customer.id;
        this.currentCustomer = {
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address
        };
        this.showDialog = true;
    }

    public async saveCustomer() {
        if (!this.currentCustomer.name || !this.currentCustomer.phone) {
            Toaster.error('الرجاء ملء الحقول المطلوبة');
            return;
        }

        try {
            if (this.editMode) {
                await this.customerService.updateCustomer(this.editingId, this.currentCustomer);
                Toaster.success('تم تحديث بيانات العميل بنجاح', 'نجاح');
            } else {
                await this.customerService.addCustomer(this.currentCustomer);
                Toaster.success('تم إضافة العميل بنجاح', 'نجاح');
            }
            await this.loadCustomers();
            this.closeDialog();
        } catch (error) {
            Toaster.error('فشل حفظ بيانات العميل');
        }
    }

    public async deleteCustomer(customer: Customer) {
        if (confirm(`هل أنت متأكد من حذف العميل "${customer.name}"؟`)) {
            try {
                await this.customerService.deleteCustomer(customer.id);
                Toaster.success('تم حذف العميل بنجاح', 'نجاح');
                await this.loadCustomers();
            } catch (error) {
                Toaster.error('فشل حذف العميل');
            }
        }
    }

    public closeDialog() {
        this.showDialog = false;
        this.currentCustomer = this.getEmptyCustomer();
        this.editingId = '';
    }

    private getEmptyCustomer(): CustomerInput {
        return {
            name: '',
            phone: '',
            email: '',
            address: ''
        };
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        return status === 'active' ? `${baseClasses} status--green` : `${baseClasses} status--red`;
    }

    public getStatusText(status: string): string {
        return status === 'active' ? 'نشط' : 'غير نشط';
    }

    public formatDate(date?: Date): string {
        return date ? new Date(date).toLocaleDateString('ar-SA') : '-';
    }
}
