import { Component, Vue } from 'vue-property-decorator';
import WithRender from './ProductDetails.html';

interface Product {
    id: number;
    name: string;
    nameEn: string;
    description: string;
    price: number;
    category: string;
    categoryAr: string;
    image: string;
    inStock: boolean;
    ingredients?: string;
    weight?: string;
}

@WithRender
@Component({})
export default class ProductDetails extends Vue {
    public loading: boolean = true;
    public product: Product | null = null;
    public quantity: number = 1;

    mounted() {
        const productId = parseInt(this.$route.params.id);
        this.loadProduct(productId);
    }

    public loadProduct(id: number) {
        this.loading = true;
        // Simulate API call
        setTimeout(() => {
            // Mock product data
            const products: Product[] = [
                {
                    id: 1,
                    name: 'بقلاوة فستق حلبي',
                    nameEn: 'Pistachio Baklava',
                    description: 'بقلاوة فاخرة محشوة بالفستق الحلبي الأصلي مع القطر. تحضر يومياً بأجود أنواع العجين والسمن الطبيعي.',
                    price: 85,
                    category: 'eastern',
                    categoryAr: 'حلويات شرقية',
                    image: 'https://via.placeholder.com/400x300/1B8354/FFFFFF?text=بقلاوة',
                    inStock: true,
                    ingredients: 'عجينة البقلاوة، فستق حلبي، سمن طبيعي، سكر، ماء ورد',
                    weight: '500 جرام'
                },
                {
                    id: 2,
                    name: 'كنافة نابلسية',
                    nameEn: 'Nabulsi Kunafa',
                    description: 'كنافة نابلسية أصلية بالجبنة الحلوة والقطر',
                    price: 75,
                    category: 'eastern',
                    categoryAr: 'حلويات شرقية',
                    image: 'https://via.placeholder.com/400x300/1B8354/FFFFFF?text=كنافة',
                    inStock: true,
                    ingredients: 'شعيرية كنافة، جبنة حلوة، سمن، قطر',
                    weight: '500 جرام'
                }
            ];
            
            this.product = products.find(p => p.id === id) || products[0];
            this.loading = false;
        }, 500);
    }

    public addToCart() {
        const productName = this.product ? this.product.name : '';
        alert(`تمت إضافة ${this.quantity} من ${productName} إلى السلة`);
        // In a real app, this would update cart state
    }

    public goBack() {
        this.$router.push('/products');
    }

    public get totalPrice(): number {
        const price = this.product ? this.product.price : 0;
        return price * this.quantity;
    }
}
