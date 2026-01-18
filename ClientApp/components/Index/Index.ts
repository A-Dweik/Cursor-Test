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
    gender: string;
    vaccinated: boolean;
    neutered: boolean;
    healthStatus: string;
    weight: string;
    temperament: string[];
    specialNeeds: string;
    imageColor: string;
    category: string;
    dateAdded: string;
}

interface AdoptionForm {
    applicantName: string;
    email: string;
    phone: string;
    address: string;
    hasExperience: boolean;
    hasPets: boolean;
    reason: string;
}

@WithRender
@Component({})
export default class Index extends Vue {
    public loading: boolean = false;
    public cats: Cat[] = [];
    public selectedFilter: string = 'all';
    public searchQuery: string = '';
    
    // Dialogs
    public detailsDialog: boolean = false;
    public adoptionDialog: boolean = false;
    public addCatDialog: boolean = false;
    public selectedCat: Cat | null = null;
    
    // Forms
    public adoptionForm: AdoptionForm = {
        applicantName: '',
        email: '',
        phone: '',
        address: '',
        hasExperience: false,
        hasPets: false,
        reason: ''
    };
    
    public newCat: Cat = this.getEmptyCat();
    
    // Validation
    public formValid: boolean = false;
    public rules = {
        required: (v: string) => !!v || 'هذا الحقل مطلوب',
        email: (v: string) => /.+@.+\..+/.test(v) || 'البريد الإلكتروني غير صحيح',
        phone: (v: string) => /^[0-9]{10}$/.test(v) || 'رقم الهاتف يجب أن يكون 10 أرقام'
    };

    mounted() {
        this.loadCats();
    }

    private getEmptyCat(): Cat {
        return {
            id: 0,
            name: '',
            age: '',
            breed: '',
            color: '',
            description: '',
            adopted: false,
            gender: 'ذكر',
            vaccinated: false,
            neutered: false,
            healthStatus: 'ممتاز',
            weight: '',
            temperament: [],
            specialNeeds: '',
            imageColor: '#1B8354',
            category: 'قطط صغيرة',
            dateAdded: new Date().toISOString().split('T')[0]
        };
    }

    private loadCats() {
        this.loading = true;
        
        this.cats = [
            {
                id: 1,
                name: 'لونا',
                age: 'سنتان',
                breed: 'شيرازي',
                color: 'أبيض',
                gender: 'أنثى',
                description: 'قطة جميلة وهادئة، تحب اللعب والاهتمام. مناسبة للعائلات والأطفال',
                adopted: false,
                vaccinated: true,
                neutered: true,
                healthStatus: 'ممتاز',
                weight: '4 كجم',
                temperament: ['هادئة', 'ودودة', 'محبة للعب'],
                specialNeeds: 'لا يوجد',
                imageColor: '#1B8354',
                category: 'قطط بالغة',
                dateAdded: '2024-01-01'
            },
            {
                id: 2,
                name: 'ميلو',
                age: '٣ سنوات',
                breed: 'بريطاني قصير الشعر',
                color: 'رمادي',
                gender: 'ذكر',
                description: 'قط هادئ ومحب للنوم، يناسب الأشخاص الذين يعيشون بمفردهم أو كبار السن',
                adopted: false,
                vaccinated: true,
                neutered: true,
                healthStatus: 'جيد',
                weight: '5.5 كجم',
                temperament: ['هادئ', 'مستقل', 'محب للراحة'],
                specialNeeds: 'يحتاج إلى طعام خاص',
                imageColor: '#607D8B',
                category: 'قطط بالغة',
                dateAdded: '2023-12-15'
            },
            {
                id: 3,
                name: 'سيمبا',
                age: '٦ أشهر',
                breed: 'مين كون',
                color: 'برتقالي',
                gender: 'ذكر',
                description: 'قط نشيط جداً ويحب اللعب والاستكشاف، يحتاج إلى مساحة كبيرة للحركة',
                adopted: false,
                vaccinated: true,
                neutered: false,
                healthStatus: 'ممتاز',
                weight: '3 كجم',
                temperament: ['نشيط', 'فضولي', 'مرح'],
                specialNeeds: 'لا يوجد',
                imageColor: '#FF9800',
                category: 'قطط صغيرة',
                dateAdded: '2024-01-10'
            },
            {
                id: 4,
                name: 'بيلا',
                age: '٥ سنوات',
                breed: 'سيامي',
                color: 'بيج وبني',
                gender: 'أنثى',
                description: 'قطة ذكية ومخلصة، تحب التواصل مع أصحابها بشكل مستمر وصوتها واضح',
                adopted: false,
                vaccinated: true,
                neutered: true,
                healthStatus: 'ممتاز',
                weight: '3.5 كجم',
                temperament: ['ذكية', 'ثرثارة', 'مخلصة'],
                specialNeeds: 'لا يوجد',
                imageColor: '#795548',
                category: 'قطط بالغة',
                dateAdded: '2023-11-20'
            },
            {
                id: 5,
                name: 'تشارلي',
                age: '٤ أشهر',
                breed: 'مصري ماو',
                color: 'فضي',
                gender: 'ذكر',
                description: 'قط صغير ونشيط، يحب اللعب ويتعلم بسرعة. مناسب للعائلات النشطة',
                adopted: false,
                vaccinated: true,
                neutered: false,
                healthStatus: 'ممتاز',
                weight: '2 كجم',
                temperament: ['نشيط', 'ذكي', 'اجتماعي'],
                specialNeeds: 'لا يوجد',
                imageColor: '#9E9E9E',
                category: 'قطط صغيرة',
                dateAdded: '2024-01-15'
            },
            {
                id: 6,
                name: 'كوكي',
                age: '٧ سنوات',
                breed: 'راغدول',
                color: 'كريمي',
                gender: 'أنثى',
                description: 'قطة هادئة ومريحة، مثالية لكبار السن أو العائلات الهادئة. تحب الحضن',
                adopted: true,
                vaccinated: true,
                neutered: true,
                healthStatus: 'جيد',
                weight: '4.5 كجم',
                temperament: ['هادئة جداً', 'محبة للحضن', 'مطيعة'],
                specialNeeds: 'لا يوجد',
                imageColor: '#F5DEB3',
                category: 'قطط بالغة',
                dateAdded: '2023-10-01'
            },
            {
                id: 7,
                name: 'فيليكس',
                age: '١ سنة',
                breed: 'بنغالي',
                color: 'بني مرقط',
                gender: 'ذكر',
                description: 'قط نشيط جداً بمظهر بري، يحب التسلق واللعب في الماء. يحتاج إلى صاحب نشيط',
                adopted: false,
                vaccinated: true,
                neutered: true,
                healthStatus: 'ممتاز',
                weight: '4 كجم',
                temperament: ['نشيط جداً', 'رياضي', 'مغامر'],
                specialNeeds: 'يحتاج إلى مساحة للتسلق',
                imageColor: '#8B4513',
                category: 'قطط بالغة',
                dateAdded: '2024-01-05'
            },
            {
                id: 8,
                name: 'نالا',
                age: '٣ أشهر',
                breed: 'بيرشن',
                color: 'أسود وأبيض',
                gender: 'أنثى',
                description: 'قطة صغيرة جميلة وهادئة، تحب الاهتمام والحضن. مناسبة للمبتدئين',
                adopted: false,
                vaccinated: true,
                neutered: false,
                healthStatus: 'ممتاز',
                weight: '1.5 كجم',
                temperament: ['هادئة', 'محبة', 'خجولة'],
                specialNeeds: 'لا يوجد',
                imageColor: '#000000',
                category: 'قطط صغيرة',
                dateAdded: '2024-01-18'
            }
        ];

        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    get filteredCats() {
        let filtered = this.cats;
        
        // Filter by adoption status
        if (this.selectedFilter === 'all') {
            filtered = filtered.filter(cat => !cat.adopted);
        } else if (this.selectedFilter === 'young') {
            filtered = filtered.filter(cat => !cat.adopted && cat.category === 'قطط صغيرة');
        } else if (this.selectedFilter === 'adult') {
            filtered = filtered.filter(cat => !cat.adopted && cat.category === 'قطط بالغة');
        } else if (this.selectedFilter === 'adopted') {
            filtered = filtered.filter(cat => cat.adopted);
        }
        
        // Filter by search query
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(cat => 
                cat.name.toLowerCase().includes(query) ||
                cat.breed.toLowerCase().includes(query) ||
                cat.color.toLowerCase().includes(query) ||
                cat.description.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    }

    get availableCatsCount() {
        return this.cats.filter(cat => !cat.adopted).length;
    }

    get adoptedCatsCount() {
        return this.cats.filter(cat => cat.adopted).length;
    }

    get youngCatsCount() {
        return this.cats.filter(cat => !cat.adopted && cat.category === 'قطط صغيرة').length;
    }

    get adultCatsCount() {
        return this.cats.filter(cat => !cat.adopted && cat.category === 'قطط بالغة').length;
    }

    public filterCats(filter: string) {
        this.selectedFilter = filter;
    }

    public viewDetails(cat: Cat) {
        this.selectedCat = cat;
        this.detailsDialog = true;
    }

    public openAdoptionDialog(cat: Cat) {
        this.selectedCat = cat;
        this.adoptionDialog = true;
    }

    public closeDetailsDialog() {
        this.detailsDialog = false;
        this.selectedCat = null;
    }

    public closeAdoptionDialog() {
        this.adoptionDialog = false;
        this.adoptionForm = {
            applicantName: '',
            email: '',
            phone: '',
            address: '',
            hasExperience: false,
            hasPets: false,
            reason: ''
        };
    }

    public submitAdoptionRequest() {
        if (this.selectedCat) {
            this.selectedCat.adopted = true;
            this.closeAdoptionDialog();
            alert(`تم إرسال طلب تبني ${this.selectedCat.name} بنجاح!\n\nسنتواصل معك قريباً على:\nالبريد الإلكتروني: ${this.adoptionForm.email}\nالهاتف: ${this.adoptionForm.phone}\n\nشكراً لاهتمامك بتبني القطط!`);
        }
    }

    public openAddCatDialog() {
        this.newCat = this.getEmptyCat();
        this.addCatDialog = true;
    }

    public closeAddCatDialog() {
        this.addCatDialog = false;
        this.newCat = this.getEmptyCat();
    }

    public addNewCat() {
        this.newCat.id = Math.max(...this.cats.map(c => c.id)) + 1;
        this.cats.push({...this.newCat});
        this.closeAddCatDialog();
        alert(`تمت إضافة القط ${this.newCat.name} بنجاح!`);
    }

    public deleteCat(cat: Cat) {
        if (confirm(`هل أنت متأكد من حذف ${cat.name}؟`)) {
            const index = this.cats.findIndex(c => c.id === cat.id);
            if (index > -1) {
                this.cats.splice(index, 1);
                alert(`تم حذف ${cat.name} بنجاح!`);
            }
        }
    }

    public getCategoryColor(category: string): string {
        return category === 'قطط صغيرة' ? 'primary' : 'info';
    }

    public getHealthColor(status: string): string {
        if (status === 'ممتاز') return 'success';
        if (status === 'جيد') return 'info';
        return 'warning';
    }
}
