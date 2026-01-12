import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './Analytics.html';
import SaleService from '@/Services/Business/SaleService';
import ProductService from '@/Services/Business/ProductService';
import CustomerService from '@/Services/Business/CustomerService';
import { Sale } from '@/Models/Sale';
import { Product } from '@/Models/Product';
import { Customer } from '@/Models/Customer';

@WithRender
@Component({})
export default class Analytics extends Vue {
    @Inject(SaleService) private saleService!: SaleService;
    @Inject(ProductService) private productService!: ProductService;
    @Inject(CustomerService) private customerService!: CustomerService;

    public loading: boolean = false;
    public totalRevenue: number = 0;
    public todaySales: number = 0;
    public totalProducts: number = 0;
    public totalCustomers: number = 0;
    public lowStockProducts: Product[] = [];
    public topCustomers: Customer[] = [];
    public recentSales: Sale[] = [];

    public async mounted() {
        await this.loadAnalytics();
    }

    private async loadAnalytics() {
        this.loading = true;
        try {
            // Load revenue data
            this.totalRevenue = await this.saleService.getTotalRevenue();
            
            // Load today's sales
            const todaySalesData = await this.saleService.getTodaySales();
            this.todaySales = todaySalesData.reduce((sum, sale) => sum + sale.totalAmount, 0);

            // Load products
            const products = await this.productService.getAllProducts();
            this.totalProducts = products.length;
            this.lowStockProducts = products.filter(p => p.status === 'low' || p.status === 'out');

            // Load customers
            const customers = await this.customerService.getAllCustomers();
            this.totalCustomers = customers.length;
            this.topCustomers = customers
                .sort((a, b) => b.totalPurchases - a.totalPurchases)
                .slice(0, 5);

            // Load recent sales
            const allSales = await this.saleService.getAllSales();
            this.recentSales = allSales
                .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())
                .slice(0, 5);

        } catch (error) {
            console.error('Failed to load analytics', error);
        } finally {
            this.loading = false;
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'low': return `${baseClasses} status--orange`;
            case 'out': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متوفر';
            case 'low': return 'كمية قليلة';
            case 'out': return 'غير متوفر';
            default: return status;
        }
    }

    public formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('ar-SA');
    }
}
