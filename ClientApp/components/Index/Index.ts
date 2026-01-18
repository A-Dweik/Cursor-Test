import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

export interface Sweet {
    id: number;
    name: string;
    nameEn: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
    stock: number;
}

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    public sweets: Sweet[] = [];
    public loading: boolean = false;
    public selectedCategory: string = 'all';
    public searchQuery: string = '';

    public mounted() {
        this.loadSweets();
    }

    private loadSweets() {
        this.loading = true;
        
        // Mock data for sweet machine
        this.sweets = [
            {
                id: 1,
                name: 'شوكولاتة داكنة',
                nameEn: 'Dark Chocolate',
                description: 'شوكولاتة داكنة فاخرة بنسبة كاكاو 70%',
                price: 5,
                category: 'شوكولاتة',
                image: '',
                available: true,
                stock: 15
            },
            {
                id: 2,
                name: 'كيك بالفانيليا',
                nameEn: 'Vanilla Cake',
                description: 'كيك طازج بنكهة الفانيليا الطبيعية',
                price: 8,
                category: 'حلويات',
                image: '',
                available: true,
                stock: 10
            },
            {
                id: 3,
                name: 'دونات بالكراميل',
                nameEn: 'Caramel Donut',
                description: 'دونات طازجة مغطاة بصوص الكراميل الفاخر',
                price: 6,
                category: 'معجنات',
                image: '',
                available: true,
                stock: 8
            },
            {
                id: 4,
                name: 'بسكويت بالشوكولاتة',
                nameEn: 'Chocolate Cookies',
                description: 'بسكويت محشو برقائق الشوكولاتة اللذيذة',
                price: 4,
                category: 'بسكويت',
                image: '',
                available: true,
                stock: 20
            },
            {
                id: 5,
                name: 'كيك الفراولة',
                nameEn: 'Strawberry Cake',
                description: 'كيك طري بالفراولة الطازجة والكريمة',
                price: 9,
                category: 'حلويات',
                image: '',
                available: true,
                stock: 6
            },
            {
                id: 6,
                name: 'شوكولاتة الحليب',
                nameEn: 'Milk Chocolate',
                description: 'شوكولاتة كريمية بالحليب الطازج',
                price: 5,
                category: 'شوكولاتة',
                image: '',
                available: false,
                stock: 0
            },
            {
                id: 7,
                name: 'كرواسون فرنسي',
                nameEn: 'French Croissant',
                description: 'كرواسون طازج بالزبدة الفرنسية الأصلية',
                price: 7,
                category: 'معجنات',
                image: '',
                available: true,
                stock: 12
            },
            {
                id: 8,
                name: 'براونيز',
                nameEn: 'Brownies',
                description: 'براونيز بالشوكولاتة الداكنة والجوز',
                price: 7,
                category: 'حلويات',
                image: '',
                available: true,
                stock: 9
            },
            {
                id: 9,
                name: 'بسكويت الشوفان',
                nameEn: 'Oatmeal Cookies',
                description: 'بسكويت صحي بالشوفان والزبيب',
                price: 4,
                category: 'بسكويت',
                image: '',
                available: true,
                stock: 18
            }
        ];
        
        this.loading = false;
    }

    public get filteredSweets(): Sweet[] {
        let result = this.sweets;
        
        // Filter by category
        if (this.selectedCategory !== 'all') {
            result = result.filter(s => s.category === this.selectedCategory);
        }
        
        // Filter by search query
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase();
            result = result.filter(s => 
                s.name.toLowerCase().includes(query) || 
                s.nameEn.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query)
            );
        }
        
        return result;
    }

    public get categories(): string[] {
        const cats = new Set(this.sweets.map(s => s.category));
        return Array.from(cats);
    }

    public selectCategory(category: string) {
        this.selectedCategory = category;
    }

    public getStatusClasses(sweet: Sweet): string {
        const baseClasses = 'status--text status--rounded';
        if (sweet.available) {
            return `${baseClasses} status--green`;
        } else {
            return `${baseClasses} status--red`;
        }
    }

    public getStatusText(sweet: Sweet): string {
        if (sweet.available) {
            return `متوفر (${sweet.stock})`;
        } else {
            return 'غير متوفر';
        }
    }

    public getCategoryIcon(category: string): string {
        switch (category) {
            case 'شوكولاتة': return 'mdi-chess-queen';
            case 'حلويات': return 'mdi-cake-variant';
            case 'معجنات': return 'mdi-baguette';
            case 'بسكويت': return 'mdi-cookie';
            default: return 'mdi-food';
        }
    }

    public selectSweet(sweet: Sweet) {
        if (!sweet.available) {
            return;
        }
        alert(`تم اختيار: ${sweet.name}\nالسعر: ${sweet.price} ريال`);
    }
}
