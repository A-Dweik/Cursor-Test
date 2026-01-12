import { Service } from 'vue-di-container';
import { Customer, CustomerInput } from '@/Models/Customer';

@Service()
export default class CustomerService {
    private customers: Customer[] = [];

    constructor() {
        // Initialize with sample data
        this.customers = [
            {
                id: '1',
                name: 'أحمد محمد',
                phone: '0501234567',
                email: 'ahmed@example.com',
                address: 'الرياض',
                totalPurchases: 500,
                lastPurchaseDate: new Date(),
                status: 'active',
                balance: 0
            },
            {
                id: '2',
                name: 'فاطمة علي',
                phone: '0507654321',
                address: 'جدة',
                totalPurchases: 300,
                lastPurchaseDate: new Date(),
                status: 'active',
                balance: 50
            }
        ];
    }

    public async getAllCustomers(): Promise<Customer[]> {
        return Promise.resolve(this.customers);
    }

    public async getCustomerById(id: string): Promise<Customer | undefined> {
        return Promise.resolve(this.customers.find(c => c.id === id));
    }

    public async addCustomer(input: CustomerInput): Promise<Customer> {
        const newCustomer: Customer = {
            id: Date.now().toString(),
            ...input,
            totalPurchases: 0,
            status: 'active',
            balance: 0
        };
        this.customers.push(newCustomer);
        return Promise.resolve(newCustomer);
    }

    public async updateCustomer(id: string, input: Partial<CustomerInput>): Promise<Customer | undefined> {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers[index] = {
                ...this.customers[index],
                ...input
            };
            return Promise.resolve(this.customers[index]);
        }
        return Promise.resolve(undefined);
    }

    public async deleteCustomer(id: string): Promise<boolean> {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    public async updateCustomerStats(id: string, purchaseAmount: number): Promise<void> {
        const index = this.customers.findIndex(c => c.id === id);
        if (index !== -1) {
            this.customers[index].totalPurchases += purchaseAmount;
            this.customers[index].lastPurchaseDate = new Date();
        }
    }
}
