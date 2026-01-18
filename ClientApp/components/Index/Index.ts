import { Component, Vue } from 'vue-property-decorator';
import WithRender from './IndexPage.html';

interface SamsungPhone {
    id: number;
    name: string;
    nameEn: string;
    series: string;
    price: number;
    originalPrice?: number;
    description: string;
    specs: string[];
    imageUrl: string;
    isNew: boolean;
    onSale: boolean;
    storage: string;
    color: string;
}

@WithRender
@Component({})
export default class Index extends Vue {
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedSeries: string = 'all';
    public selectedPriceRange: string = 'all';
    
    public phones: SamsungPhone[] = [
        {
            id: 1,
            name: 'جالكسي S24 الترا',
            nameEn: 'Galaxy S24 Ultra',
            series: 's-series',
            price: 4999,
            originalPrice: 5499,
            description: 'أحدث هاتف رائد من سامسونج مع تقنية الذكاء الاصطناعي المتقدمة',
            specs: ['شاشة 6.8 بوصة Dynamic AMOLED', 'معالج Snapdragon 8 Gen 3', 'كاميرا 200 ميجابكسل', 'بطارية 5000 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2401/gallery/sa-en-galaxy-s24-s928-sm-s928bztgmea-thumb-539638178',
            isNew: true,
            onSale: true,
            storage: '256GB',
            color: 'تيتانيوم رمادي'
        },
        {
            id: 2,
            name: 'جالكسي S24 بلس',
            nameEn: 'Galaxy S24+',
            series: 's-series',
            price: 3799,
            description: 'أداء قوي مع شاشة كبيرة وتصميم أنيق',
            specs: ['شاشة 6.7 بوصة Dynamic AMOLED', 'معالج Snapdragon 8 Gen 3', 'كاميرا 50 ميجابكسل', 'بطارية 4900 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2401/gallery/sa-en-galaxy-s24-s926-sm-s926bzyamea-thumb-539613677',
            isNew: true,
            onSale: false,
            storage: '256GB',
            color: 'أصفر'
        },
        {
            id: 3,
            name: 'جالكسي S24',
            nameEn: 'Galaxy S24',
            series: 's-series',
            price: 3199,
            description: 'الأداء الرائد في حجم مثالي',
            specs: ['شاشة 6.2 بوصة Dynamic AMOLED', 'معالج Snapdragon 8 Gen 3', 'كاميرا 50 ميجابكسل', 'بطارية 4000 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2401/gallery/sa-en-galaxy-s24-s921-sm-s921bzvamea-thumb-539613664',
            isNew: true,
            onSale: false,
            storage: '128GB',
            color: 'بنفسجي'
        },
        {
            id: 4,
            name: 'جالكسي Z فولد 5',
            nameEn: 'Galaxy Z Fold5',
            series: 'z-series',
            price: 6999,
            originalPrice: 7499,
            description: 'الهاتف القابل للطي الأقوى مع شاشة كبيرة',
            specs: ['شاشة داخلية 7.6 بوصة', 'معالج Snapdragon 8 Gen 2', 'كاميرات ثلاثية 50 ميجابكسل', 'بطارية 4400 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2307/gallery/sa-en-galaxy-z-fold5-f946-sm-f946bzkemea-thumb-537275623',
            isNew: false,
            onSale: true,
            storage: '256GB',
            color: 'أسود'
        },
        {
            id: 5,
            name: 'جالكسي Z فليب 5',
            nameEn: 'Galaxy Z Flip5',
            series: 'z-series',
            price: 3999,
            description: 'الهاتف القابل للطي الأنيق والعصري',
            specs: ['شاشة 6.7 بوصة', 'شاشة غطاء 3.4 بوصة', 'معالج Snapdragon 8 Gen 2', 'كاميرا مزدوجة 12 ميجابكسل'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2307/gallery/sa-en-galaxy-z-flip5-f731-sm-f731blbcmea-thumb-537230835',
            isNew: false,
            onSale: false,
            storage: '256GB',
            color: 'لافندر'
        },
        {
            id: 6,
            name: 'جالكسي A54',
            nameEn: 'Galaxy A54',
            series: 'a-series',
            price: 1699,
            description: 'أداء ممتاز بسعر مناسب',
            specs: ['شاشة 6.4 بوصة Super AMOLED', 'معالج Exynos 1380', 'كاميرا 50 ميجابكسل', 'بطارية 5000 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2303/gallery/sa-en-galaxy-a54-5g-a546-sm-a546elvdmea-thumb-535858999',
            isNew: false,
            onSale: false,
            storage: '128GB',
            color: 'بنفسجي'
        },
        {
            id: 7,
            name: 'جالكسي A34',
            nameEn: 'Galaxy A34',
            series: 'a-series',
            price: 1299,
            originalPrice: 1499,
            description: 'هاتف اقتصادي بميزات رائعة',
            specs: ['شاشة 6.6 بوصة Super AMOLED', 'معالج MediaTek Dimensity 1080', 'كاميرا 48 ميجابكسل', 'بطارية 5000 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/2303/gallery/sa-en-galaxy-a34-5g-a346-sm-a346elvcmea-thumb-535855856',
            isNew: false,
            onSale: true,
            storage: '128GB',
            color: 'فضي'
        },
        {
            id: 8,
            name: 'جالكسي A14',
            nameEn: 'Galaxy A14',
            series: 'a-series',
            price: 649,
            description: 'الخيار المثالي للمبتدئين',
            specs: ['شاشة 6.6 بوصة', 'معالج MediaTek Helio G80', 'كاميرا 50 ميجابكسل', 'بطارية 5000 مللي أمبير'],
            imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/sa_en/sm-a145fzkgmeb/gallery/sa-en-galaxy-a14-5g-sm-a145-sm-a145fzkgmeb-thumb-535597077',
            isNew: false,
            onSale: false,
            storage: '64GB',
            color: 'أسود'
        }
    ];

    get filteredPhones(): SamsungPhone[] {
        let filtered = this.phones;

        // Filter by search query
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(phone => 
                phone.name.toLowerCase().includes(query) ||
                phone.nameEn.toLowerCase().includes(query) ||
                phone.description.toLowerCase().includes(query)
            );
        }

        // Filter by series
        if (this.selectedSeries !== 'all') {
            filtered = filtered.filter(phone => phone.series === this.selectedSeries);
        }

        // Filter by price range
        if (this.selectedPriceRange !== 'all') {
            filtered = filtered.filter(phone => {
                switch (this.selectedPriceRange) {
                    case 'budget': return phone.price < 1000;
                    case 'mid': return phone.price >= 1000 && phone.price < 3000;
                    case 'premium': return phone.price >= 3000 && phone.price < 5000;
                    case 'flagship': return phone.price >= 5000;
                    default: return true;
                }
            });
        }

        return filtered;
    }

    public selectFilter(filterType: string, value: string): void {
        if (filterType === 'series') {
            this.selectedSeries = value;
        } else if (filterType === 'price') {
            this.selectedPriceRange = value;
        }
    }

    public formatPrice(price: number): string {
        return price.toLocaleString('ar-SA') + ' ر.س';
    }

    public viewDetails(phone: SamsungPhone): void {
        alert(`تفاصيل الهاتف: ${phone.name}\n\nالسعر: ${this.formatPrice(phone.price)}\n\nالمواصفات:\n${phone.specs.join('\n')}`);
    }

    public buyNow(phone: SamsungPhone): void {
        alert(`شكراً لاهتمامك بشراء ${phone.name}!\n\nسيتم توجيهك إلى صفحة الطلب...`);
    }
}
