import { Service } from 'vue-di-container';
import { Product, ProductInput } from '@/Models/Product';

@Service()
export default class ProductService {
    private products: Product[] = [];

    constructor() {
        // Initialize with sample data
        this.products = [
            {
                id: '1',
                name: 'حليب طازج',
                type: 'milk',
                quantity: 50,
                unit: 'لتر',
                pricePerUnit: 5,
                lastUpdated: new Date(),
                status: 'available'
            },
            {
                id: '2',
                name: 'لحم بقري طازج',
                type: 'meat',
                quantity: 30,
                unit: 'كيلوجرام',
                pricePerUnit: 45,
                lastUpdated: new Date(),
                status: 'available'
            }
        ];
    }

    public async getAllProducts(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }

    public async getProductById(id: string): Promise<Product | undefined> {
        return Promise.resolve(this.products.find(p => p.id === id));
    }

    public async addProduct(input: ProductInput): Promise<Product> {
        const newProduct: Product = {
            id: Date.now().toString(),
            ...input,
            lastUpdated: new Date(),
            status: input.quantity > 10 ? 'available' : input.quantity > 0 ? 'low' : 'out'
        };
        this.products.push(newProduct);
        return Promise.resolve(newProduct);
    }

    public async updateProduct(id: string, input: Partial<ProductInput>): Promise<Product | undefined> {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...input,
                lastUpdated: new Date(),
                status: (input.quantity || this.products[index].quantity) > 10 ? 'available' : 
                        (input.quantity || this.products[index].quantity) > 0 ? 'low' : 'out'
            };
            return Promise.resolve(this.products[index]);
        }
        return Promise.resolve(undefined);
    }

    public async deleteProduct(id: string): Promise<boolean> {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}
