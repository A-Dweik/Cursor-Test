import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Products.html';

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
}

@WithRender
@Component({})
export default class Products extends Vue {
    public loading: boolean = true;
    public searchQuery: string = '';
    public selectedCategory: string = 'all';
    public products: Product[] = [];

    mounted() {
        this.loadProducts();
    }

    public loadProducts() {
        this.loading = true;
        // Simulate API call with mock data
        setTimeout(() => {
            this.products = [
                {
                    id: 1,
                    name: 'بقلاوة فستق حلبي',
                    nameEn: 'Pistachio Baklava',
                    description: 'بقلاوة فاخرة محشوة بالفستق الحلبي الأصلي مع القطر',
                    price: 85,
                    category: 'eastern',
                    categoryAr: 'حلويات شرقية',
                    image: 'https://via.placeholder.com/300x200/1B8354/FFFFFF?text=بقلاوة',
                    inStock: true
                },
                {
                    id: 2,
                    name: 'كنافة نابلسية',
                    nameEn: 'Nabulsi Kunafa',
                    description: 'كنافة نابلسية أصلية بالجبنة الحلوة والقطر',
                    price: 75,
                    category: 'eastern',
                    categoryAr: 'حلويات شرقية',
                    image: 'https://via.placeholder.com/300x200/1B8354/FFFFFF?text=كنافة',
                    inStock: true
                },
                {
                    id: 3,
                    name: 'معمول بالتمر',
                    nameEn: 'Date Maamoul',
                    description: 'معمول طازج محشو بعجوة التمر الفاخرة',
                    price: 45,
                    category: 'eastern',
                    categoryAr: 'حلويات شرقية',
                    image: 'https://via.placeholder.com/300x200/1B8354/FFFFFF?text=معمول',
                    inStock: true
                },
                {
                    id: 4,
                    name: 'كيك الشوكولاتة',
                    nameEn: 'Chocolate Cake',
                    description: 'كيك الشوكولاتة الفاخر بطبقات متعددة',
                    price: 120,
                    category: 'western',
                    categoryAr: 'حلويات غربية',
                    image: 'https://via.placeholder.com/300x200/dc2626/FFFFFF?text=كيك',
                    inStock: true
                },
                {
                    id: 5,
                    name: 'دونات محلاة',
                    nameEn: 'Glazed Donuts',
                    description: 'دونات طرية ومحلاة بنكهات متنوعة',
                    price: 35,
                    category: 'western',
                    categoryAr: 'حلويات غربية',
                    image: 'https://via.placeholder.com/300x200/dc2626/FFFFFF?text=دونات',
                    inStock: true
                },
                {
                    id: 6,
                    name: 'براونيز بالمكسرات',
                    nameEn: 'Nutty Brownies',
                    description: 'براونيز الشوكولاتة الغني بالمكسرات المحمصة',
                    price: 55,
                    category: 'western',
                    categoryAr: 'حلويات غربية',
                    image: 'https://via.placeholder.com/300x200/dc2626/FFFFFF?text=براونيز',
                    inStock: true
                },
                {
                    id: 7,
                    name: 'كوكيز الشوكولاتة',
                    nameEn: 'Chocolate Cookies',
                    description: 'كوكيز محلى بقطع الشوكولاتة الذائبة',
                    price: 30,
                    category: 'cookies',
                    categoryAr: 'بسكويت ومخبوزات',
                    image: 'https://via.placeholder.com/300x200/2563eb/FFFFFF?text=كوكيز',
                    inStock: true
                },
                {
                    id: 8,
                    name: 'غريبة بالزبدة',
                    nameEn: 'Butter Cookies',
                    description: 'غريبة تقليدية محضرة بالزبدة الطبيعية',
                    price: 40,
                    category: 'cookies',
                    categoryAr: 'بسكويت ومخبوزات',
                    image: 'https://via.placeholder.com/300x200/2563eb/FFFFFF?text=غريبة',
                    inStock: true
                }
            ];
            this.loading = false;
        }, 500);
    }

    public get filteredProducts(): Product[] {
        let filtered = this.products;

        // Filter by category
        if (this.selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === this.selectedCategory);
        }

        // Filter by search query
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        return filtered;
    }

    public selectCategory(category: string) {
        this.selectedCategory = category;
    }

    public getCategoryIcon(category: string): string {
        switch (category) {
            case 'eastern': return 'icon-personal_account';
            case 'western': return 'icon-company';
            case 'cookies': return 'icon-service';
            default: return 'icon-service';
        }
    }

    public viewProduct(productId: number) {
        this.$router.push(`/product/${productId}`);
    }
}
