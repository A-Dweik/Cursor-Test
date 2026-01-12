import { Service, Inject } from 'vue-di-container';
import { Sale, SaleInput } from '@/Models/Sale';
import ProductService from './ProductService';
import CustomerService from './CustomerService';

@Service()
export default class SaleService {
    @Inject(ProductService) private productService!: ProductService;
    @Inject(CustomerService) private customerService!: CustomerService;
    
    private sales: Sale[] = [];

    constructor() {
        // Initialize with sample data
        this.sales = [
            {
                id: '1',
                customerId: '1',
                customerName: 'أحمد محمد',
                productId: '1',
                productName: 'حليب طازج',
                productType: 'milk',
                quantity: 10,
                unitPrice: 5,
                totalAmount: 50,
                saleDate: new Date(),
                paymentStatus: 'paid'
            }
        ];
    }

    public async getAllSales(): Promise<Sale[]> {
        return Promise.resolve(this.sales);
    }

    public async getSaleById(id: string): Promise<Sale | undefined> {
        return Promise.resolve(this.sales.find(s => s.id === id));
    }

    public async addSale(input: SaleInput): Promise<Sale> {
        const product = await this.productService.getProductById(input.productId);
        const customer = await this.customerService.getCustomerById(input.customerId);
        
        if (!product || !customer) {
            throw new Error('Product or customer not found');
        }

        const newSale: Sale = {
            id: Date.now().toString(),
            customerId: input.customerId,
            customerName: customer.name,
            productId: input.productId,
            productName: product.name,
            productType: product.type,
            quantity: input.quantity,
            unitPrice: input.unitPrice,
            totalAmount: input.quantity * input.unitPrice,
            saleDate: new Date(),
            paymentStatus: input.paymentStatus,
            notes: input.notes
        };

        // Update product quantity
        await this.productService.updateProduct(input.productId, {
            quantity: product.quantity - input.quantity
        });

        // Update customer stats
        await this.customerService.updateCustomerStats(input.customerId, newSale.totalAmount);

        this.sales.push(newSale);
        return Promise.resolve(newSale);
    }

    public async getTodaySales(): Promise<Sale[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return Promise.resolve(this.sales.filter(s => {
            const saleDate = new Date(s.saleDate);
            saleDate.setHours(0, 0, 0, 0);
            return saleDate.getTime() === today.getTime();
        }));
    }

    public async getTotalRevenue(): Promise<number> {
        return Promise.resolve(this.sales.reduce((sum, sale) => sum + sale.totalAmount, 0));
    }
}
