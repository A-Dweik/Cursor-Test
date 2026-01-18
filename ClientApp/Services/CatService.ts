import { Service } from 'vue-di-container';
import { Cat } from './Models/Cat';

@Service()
export default class CatService {
    // Mock data for demonstration
    private cats: Cat[] = [
        {
            id: '1',
            name: 'لولو',
            age: 'kitten',
            gender: 'female',
            color: 'أبيض وبرتقالي',
            breed: 'شيرازي',
            description: 'قطة صغيرة جميلة ومحبوبة، تحب اللعب والمرح. مثالية للعائلات التي لديها أطفال.',
            vaccinated: true,
            neutered: false,
            imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
            personality: ['مرحة', 'محبة', 'نشيطة'],
            healthStatus: 'ممتازة',
            adoptionFee: 0,
            availableForAdoption: true
        },
        {
            id: '2',
            name: 'سمسم',
            age: 'young',
            gender: 'male',
            color: 'رمادي',
            breed: 'بريطاني قصير الشعر',
            description: 'قط شاب هادئ ومتوازن، يحب الجلوس بجانبك ومشاهدة التلفاز معك.',
            vaccinated: true,
            neutered: true,
            imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400',
            personality: ['هادئ', 'حنون', 'مطيع'],
            healthStatus: 'جيدة',
            adoptionFee: 200,
            availableForAdoption: true
        },
        {
            id: '3',
            name: 'ميمي',
            age: 'adult',
            gender: 'female',
            color: 'أسود وأبيض',
            breed: 'سيامي',
            description: 'قطة ناضجة جميلة جداً، تحب الاهتمام والعناية. مناسبة للأشخاص الذين يعيشون بمفردهم.',
            vaccinated: true,
            neutered: true,
            imageUrl: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=400',
            personality: ['مستقلة', 'ذكية', 'حنونة'],
            healthStatus: 'ممتازة',
            adoptionFee: 150,
            availableForAdoption: true
        },
        {
            id: '4',
            name: 'فهد',
            age: 'kitten',
            gender: 'male',
            color: 'بني مخطط',
            breed: 'تابي',
            description: 'قط صغير نشيط يحب الاستكشاف والمغامرة. سيملأ منزلك بالفرح والنشاط.',
            vaccinated: true,
            neutered: false,
            imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400',
            personality: ['فضولي', 'نشيط', 'شجاع'],
            healthStatus: 'ممتازة',
            adoptionFee: 0,
            availableForAdoption: true
        },
        {
            id: '5',
            name: 'نونو',
            age: 'young',
            gender: 'female',
            color: 'كريمي',
            breed: 'فارسي',
            description: 'قطة شابة جميلة بفراء طويل وناعم، تحب الاهتمام والتدليل.',
            vaccinated: true,
            neutered: false,
            imageUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400',
            personality: ['هادئة', 'محبوبة', 'جميلة'],
            healthStatus: 'جيدة',
            adoptionFee: 300,
            availableForAdoption: true
        },
        {
            id: '6',
            name: 'بوسي',
            age: 'adult',
            gender: 'male',
            color: 'برتقالي',
            breed: 'مين كون',
            description: 'قط كبير الحجم ولطيف جداً، يحب الأطفال والعائلات الكبيرة.',
            vaccinated: true,
            neutered: true,
            imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
            personality: ['لطيف', 'اجتماعي', 'كبير'],
            healthStatus: 'ممتازة',
            adoptionFee: 250,
            availableForAdoption: true
        }
    ];

    public async getAllCats(): Promise<Cat[]> {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.cats);
            }, 500);
        });
    }

    public async getCatById(id: string): Promise<Cat | undefined> {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const cat = this.cats.find(c => c.id === id);
                resolve(cat);
            }, 300);
        });
    }

    public async adoptCat(catId: string, adopterInfo: any): Promise<boolean> {
        // Simulate adoption process
        return new Promise((resolve) => {
            setTimeout(() => {
                const catIndex = this.cats.findIndex(c => c.id === catId);
                if (catIndex !== -1) {
                    this.cats[catIndex].availableForAdoption = false;
                    resolve(true);
                }
                resolve(false);
            }, 1000);
        });
    }
}
