import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './Sales.html';
import SaleService from '@/Services/Business/SaleService';
import ProductService from '@/Services/Business/ProductService';
import CustomerService from '@/Services/Business/CustomerService';
import { Sale, SaleInput } from '@/Models/Sale';
import { Product } from '@/Models/Product';
import { Customer } from '@/Models/Customer';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class Sales extends Vue {
    @Inject(SaleService) private saleService!: SaleService;
    @Inject(ProductService) private productService!: ProductService;
    @Inject(CustomerService) private customerService!: CustomerService;

    public sales: Sale[] = [];
    public products: Product[] = [];
    public customers: Customer[] = [];
    public loading: boolean = false;
    public showDialog: boolean = false;
    public currentSale: SaleInput = this.getEmptySale();
    public selectedProduct: Product | null = null;

    public headers = [
        { text: 'التاريخ', value: 'saleDate', sortable: true },
        { text: 'العميل', value: 'customerName', sortable: true },
        { text: 'المنتج', value: 'productName', sortable: true },
        { text: 'الكمية', value: 'quantity', sortable: false },
        { text: 'سعر الوحدة', value: 'unitPrice', sortable: false },
        { text: 'المبلغ الإجمالي', value: 'totalAmount', sortable: true },
        { text: 'حالة الدفع', value: 'paymentStatus', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false }
    ];

    public async mounted() {
        await this.loadData();
    }

    private async loadData() {
        this.loading = true;
        try {
            this.sales = await this.saleService.getAllSales();
            this.products = await this.productService.getAllProducts();
            this.customers = await this.customerService.getAllCustomers();
        } catch (error) {
            Toaster.error('فشل تحميل البيانات');
        } finally {
            this.loading = false;
        }
    }

    public openAddDialog() {
        this.currentSale = this.getEmptySale();
        this.selectedProduct = null;
        this.showDialog = true;
    }

    public onProductChange() {
        if (this.currentSale.productId) {
            const product = this.products.find(p => p.id === this.currentSale.productId);
            if (product) {
                this.selectedProduct = product;
                this.currentSale.unitPrice = product.pricePerUnit;
            }
        }
    }

    public get calculatedTotal(): number {
        return this.currentSale.quantity * this.currentSale.unitPrice;
    }

    public async saveSale() {
        if (!this.currentSale.customerId || !this.currentSale.productId || 
            this.currentSale.quantity <= 0 || this.currentSale.unitPrice <= 0) {
            Toaster.error('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        if (this.selectedProduct && this.currentSale.quantity > this.selectedProduct.quantity) {
            Toaster.error('الكمية المطلوبة أكبر من الكمية المتوفرة في المخزون');
            return;
        }

        try {
            await this.saleService.addSale(this.currentSale);
            Toaster.success('تم تسجيل المبيعة بنجاح', 'نجاح');
            await this.loadData();
            this.closeDialog();
        } catch (error) {
            Toaster.error('فشل حفظ المبيعة');
        }
    }

    public closeDialog() {
        this.showDialog = false;
        this.currentSale = this.getEmptySale();
        this.selectedProduct = null;
    }

    private getEmptySale(): SaleInput {
        return {
            customerId: '',
            productId: '',
            quantity: 1,
            unitPrice: 0,
            paymentStatus: 'paid',
            notes: ''
        };
    }

    public getPaymentStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'paid': return `${baseClasses} status--green`;
            case 'partial': return `${baseClasses} status--orange`;
            case 'pending': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getPaymentStatusText(status: string): string {
        switch (status) {
            case 'paid': return 'مدفوع';
            case 'partial': return 'مدفوع جزئياً';
            case 'pending': return 'معلق';
            default: return status;
        }
    }

    public formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('ar-SA');
    }
}
