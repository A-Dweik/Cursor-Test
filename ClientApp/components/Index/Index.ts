import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';

interface Cat {
    id: number;
    name: string;
    age: string;
    breed: string;
    color: string;
    description: string;
    adopted: boolean;
    imageUrl: string;
    category: string;
}

@WithRender
@Component({})
export default class Index extends Vue {
    public loading: boolean = false;
    public cats: Cat[] = [];
    public selectedFilter: string = 'all';

    mounted() {
        this.loadCats();
    }

    private loadCats() {
        this.loading = true;
        
        // Mock data - in real app, this would come from API
        this.cats = [
            {
                id: 1,
                name: 'لونا',
                age: 'سنتان',
                breed: 'شيرازي',
                color: 'أبيض',
                description: 'قطة جميلة وهادئة، تحب اللعب والاهتمام. مناسبة للعائلات',
                adopted: false,
                imageUrl: 'https://via.placeholder.com/300x200/1B8354/FFFFFF?text=لونا',
                category: 'قطط صغيرة'
            },
            {
                id: 2,
                name: 'ميلو',
                age: '٣ سنوات',
                breed: 'بريطاني قصير الشعر',
                color: 'رمادي',
                description: 'قط هادئ ومحب للنوم، يناسب الأشخاص الذين يعيشون بمفردهم',
                adopted: false,
                imageUrl: 'https://via.placeholder.com/300x200/2563eb/FFFFFF?text=ميلو',
                category: 'قطط بالغة'
            },
            {
                id: 3,
                name: 'سيمبا',
                age: '٦ أشهر',
                breed: 'مين كون',
                color: 'برتقالي',
                description: 'قط نشيط جداً ويحب اللعب والاستكشاف، يحتاج إلى مساحة كبيرة',
                adopted: false,
                imageUrl: 'https://via.placeholder.com/300x200/ea580c/FFFFFF?text=سيمبا',
                category: 'قطط صغيرة'
            },
            {
                id: 4,
                name: 'بيلا',
                age: '٥ سنوات',
                breed: 'سيامي',
                color: 'بيج وبني',
                description: 'قطة ذكية ومخلصة، تحب التواصل مع أصحابها بشكل مستمر',
                adopted: false,
                imageUrl: 'https://via.placeholder.com/300x200/7c3aed/FFFFFF?text=بيلا',
                category: 'قطط بالغة'
            },
            {
                id: 5,
                name: 'تشارلي',
                age: '٤ أشهر',
                breed: 'مصري ماو',
                color: 'فضي',
                description: 'قط صغير ونشيط، يحب اللعب ويتعلم بسرعة',
                adopted: false,
                imageUrl: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=تشارلي',
                category: 'قطط صغيرة'
            },
            {
                id: 6,
                name: 'كوكي',
                age: '٧ سنوات',
                breed: 'راغدول',
                color: 'كريمي',
                description: 'قطة هادئة ومريحة، مثالية لكبار السن أو العائلات الهادئة',
                adopted: true,
                imageUrl: 'https://via.placeholder.com/300x200/9ca3af/FFFFFF?text=كوكي',
                category: 'قطط بالغة'
            }
        ];

        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    get filteredCats() {
        if (this.selectedFilter === 'all') {
            return this.cats.filter(cat => !cat.adopted);
        } else if (this.selectedFilter === 'young') {
            return this.cats.filter(cat => !cat.adopted && cat.category === 'قطط صغيرة');
        } else if (this.selectedFilter === 'adult') {
            return this.cats.filter(cat => !cat.adopted && cat.category === 'قطط بالغة');
        } else if (this.selectedFilter === 'adopted') {
            return this.cats.filter(cat => cat.adopted);
        }
        return this.cats;
    }

    get availableCatsCount() {
        return this.cats.filter(cat => !cat.adopted).length;
    }

    get adoptedCatsCount() {
        return this.cats.filter(cat => cat.adopted).length;
    }

    public filterCats(filter: string) {
        this.selectedFilter = filter;
    }

    public viewDetails(cat: Cat) {
        alert(`تفاصيل القط: ${cat.name}\n\nالسلالة: ${cat.breed}\nالعمر: ${cat.age}\nاللون: ${cat.color}\n\n${cat.description}`);
    }

    public adoptCat(cat: Cat) {
        if (confirm(`هل تريد تبني ${cat.name}؟`)) {
            cat.adopted = true;
            alert(`تم تبني ${cat.name} بنجاح! سنتواصل معك قريباً لإكمال الإجراءات.`);
        }
    }

    public getCategoryIcon(category: string): string {
        if (category === 'قطط صغيرة') return 'icon-personal_account';
        if (category === 'قطط بالغة') return 'icon-company';
        return 'icon-service';
    }
}
