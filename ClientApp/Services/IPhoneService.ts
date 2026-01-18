import { Service } from 'vue-di-container';

export interface IPhoneModel {
    id: string;
    name: string;
    nameAr: string;
    model: string;
    price: number;
    storage: string;
    colors: string[];
    screen: string;
    chip: string;
    camera: string;
    battery: string;
    image: string;
    description: string;
    descriptionAr: string;
    isNew: boolean;
    isPopular: boolean;
}

@Service()
export default class IPhoneService {
    
    private iphones: IPhoneModel[] = [
        {
            id: '1',
            name: 'iPhone 15 Pro Max',
            nameAr: 'آيفون 15 برو ماكس',
            model: 'A3108',
            price: 5499,
            storage: '256GB / 512GB / 1TB',
            colors: ['تيتانيوم طبيعي', 'تيتانيوم أزرق', 'تيتانيوم أبيض', 'تيتانيوم أسود'],
            screen: '6.7 بوصة Super Retina XDR',
            chip: 'A17 Pro',
            camera: 'نظام كاميرا Pro ثلاثي 48MP',
            battery: 'حتى 29 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845699311',
            description: 'iPhone 15 Pro Max with titanium design',
            descriptionAr: 'آيفون 15 برو ماكس بتصميم التيتانيوم الجديد وشريحة A17 Pro الثورية',
            isNew: true,
            isPopular: true,
        },
        {
            id: '2',
            name: 'iPhone 15 Pro',
            nameAr: 'آيفون 15 برو',
            model: 'A3102',
            price: 4499,
            storage: '128GB / 256GB / 512GB / 1TB',
            colors: ['تيتانيوم طبيعي', 'تيتانيوم أزرق', 'تيتانيوم أبيض', 'تيتانيوم أسود'],
            screen: '6.1 بوصة Super Retina XDR',
            chip: 'A17 Pro',
            camera: 'نظام كاميرا Pro ثلاثي 48MP',
            battery: 'حتى 23 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702138',
            description: 'iPhone 15 Pro with titanium design',
            descriptionAr: 'آيفون 15 برو بتصميم التيتانيوم الأنيق وشريحة A17 Pro',
            isNew: true,
            isPopular: true,
        },
        {
            id: '3',
            name: 'iPhone 15 Plus',
            nameAr: 'آيفون 15 بلس',
            model: 'A3093',
            price: 3799,
            storage: '128GB / 256GB / 512GB',
            colors: ['أسود', 'أزرق', 'أخضر', 'أصفر', 'وردي'],
            screen: '6.7 بوصة Super Retina XDR',
            chip: 'A16 Bionic',
            camera: 'نظام كاميرا ثنائي 48MP',
            battery: 'حتى 26 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972',
            description: 'iPhone 15 Plus with large display',
            descriptionAr: 'آيفون 15 بلس بشاشة كبيرة وشريحة A16 Bionic',
            isNew: true,
            isPopular: false,
        },
        {
            id: '4',
            name: 'iPhone 15',
            nameAr: 'آيفون 15',
            model: 'A3089',
            price: 3399,
            storage: '128GB / 256GB / 512GB',
            colors: ['أسود', 'أزرق', 'أخضر', 'أصفر', 'وردي'],
            screen: '6.1 بوصة Super Retina XDR',
            chip: 'A16 Bionic',
            camera: 'نظام كاميرا ثنائي 48MP',
            battery: 'حتى 20 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777145',
            description: 'iPhone 15 with Dynamic Island',
            descriptionAr: 'آيفون 15 مع Dynamic Island وكاميرا 48 ميجابكسل',
            isNew: true,
            isPopular: true,
        },
        {
            id: '5',
            name: 'iPhone 14 Pro Max',
            nameAr: 'آيفون 14 برو ماكس',
            model: 'A2894',
            price: 4999,
            storage: '128GB / 256GB / 512GB / 1TB',
            colors: ['أسود فلكي', 'فضي', 'ذهبي', 'بنفسجي داكن'],
            screen: '6.7 بوصة Super Retina XDR',
            chip: 'A16 Bionic',
            camera: 'نظام كاميرا Pro ثلاثي 48MP',
            battery: 'حتى 29 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896',
            description: 'iPhone 14 Pro Max with Always-On display',
            descriptionAr: 'آيفون 14 برو ماكس مع شاشة Always-On وشريحة A16 Bionic',
            isNew: false,
            isPopular: true,
        },
        {
            id: '6',
            name: 'iPhone 14 Pro',
            nameAr: 'آيفون 14 برو',
            model: 'A2890',
            price: 4299,
            storage: '128GB / 256GB / 512GB / 1TB',
            colors: ['أسود فلكي', 'فضي', 'ذهبي', 'بنفسجي داكن'],
            screen: '6.1 بوصة Super Retina XDR',
            chip: 'A16 Bionic',
            camera: 'نظام كاميرا Pro ثلاثي 48MP',
            battery: 'حتى 23 ساعة تشغيل فيديو',
            image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841751',
            description: 'iPhone 14 Pro with Dynamic Island',
            descriptionAr: 'آيفون 14 برو مع Dynamic Island وكاميرا احترافية',
            isNew: false,
            isPopular: false,
        },
    ];

    public async getAllIPhones(): Promise<IPhoneModel[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.iphones);
            }, 500);
        });
    }

    public async getIPhoneById(id: string): Promise<IPhoneModel | null> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const iphone = this.iphones.find(p => p.id === id);
                resolve(iphone || null);
            }, 300);
        });
    }

    public async searchIPhones(query: string): Promise<IPhoneModel[]> {
        // Simulate API search
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = this.iphones.filter(p => 
                    p.nameAr.includes(query) || 
                    p.name.toLowerCase().includes(query.toLowerCase())
                );
                resolve(results);
            }, 400);
        });
    }
}
