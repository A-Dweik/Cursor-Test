import { Service } from 'vue-di-container';
import Pet, { AdoptionRequest } from './PetModel';

@Service()
export default class PetService {
    private mockPets: Pet[] = [
        {
            id: 1,
            name: 'فلفل',
            type: 'cat',
            breed: 'شيرازي',
            age: 2,
            gender: 'male',
            color: 'رمادي',
            description: 'قط هادئ ومحب للعب، مناسب للعائلات',
            healthStatus: 'ممتاز',
            vaccinated: true,
            neutered: true,
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
            status: 'available',
            location: 'الرياض',
            dateAdded: '2024-01-15',
        },
        {
            id: 2,
            name: 'ليلى',
            type: 'cat',
            breed: 'سيامي',
            age: 1,
            gender: 'female',
            color: 'بيج وبني',
            description: 'قطة نشيطة وذكية، تحب الاهتمام',
            healthStatus: 'ممتاز',
            vaccinated: true,
            neutered: false,
            image: 'https://images.unsplash.com/photo-1573865526739-10c1deaecd04?w=400',
            status: 'available',
            location: 'جدة',
            dateAdded: '2024-01-18',
        },
        {
            id: 3,
            name: 'ماكس',
            type: 'dog',
            breed: 'جولدن ريتريفر',
            age: 3,
            gender: 'male',
            color: 'ذهبي',
            description: 'كلب ودود ومخلص، رائع مع الأطفال',
            healthStatus: 'ممتاز',
            vaccinated: true,
            neutered: true,
            image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
            status: 'available',
            location: 'الدمام',
            dateAdded: '2024-01-10',
        },
        {
            id: 4,
            name: 'لونا',
            type: 'dog',
            breed: 'هاسكي سيبيري',
            age: 2,
            gender: 'female',
            color: 'أبيض ورمادي',
            description: 'كلبة نشيطة تحتاج لصاحب رياضي',
            healthStatus: 'جيد جداً',
            vaccinated: true,
            neutered: false,
            image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
            status: 'available',
            location: 'الرياض',
            dateAdded: '2024-01-12',
        },
        {
            id: 5,
            name: 'مشمش',
            type: 'cat',
            breed: 'مصري',
            age: 1,
            gender: 'male',
            color: 'برتقالي',
            description: 'قط صغير لطيف ومرح، يحب اللعب',
            healthStatus: 'ممتاز',
            vaccinated: true,
            neutered: false,
            image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
            status: 'available',
            location: 'مكة',
            dateAdded: '2024-01-20',
        },
        {
            id: 6,
            name: 'روكي',
            type: 'dog',
            breed: 'جيرمن شيبرد',
            age: 4,
            gender: 'male',
            color: 'بني وأسود',
            description: 'كلب حارس مدرب وذكي',
            healthStatus: 'ممتاز',
            vaccinated: true,
            neutered: true,
            image: 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=400',
            status: 'pending',
            location: 'جدة',
            dateAdded: '2024-01-08',
        },
    ];

    public async getAllPets(): Promise<Pet[]> {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.mockPets;
    }

    public async getPetsByType(type: 'cat' | 'dog' | 'all'): Promise<Pet[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        if (type === 'all') {
            return this.mockPets;
        }
        return this.mockPets.filter(pet => pet.type === type);
    }

    public async getPetById(id: number): Promise<Pet | undefined> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockPets.find(pet => pet.id === id);
    }

    public async submitAdoptionRequest(request: AdoptionRequest): Promise<boolean> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update pet status to pending
        const pet = this.mockPets.find(p => p.id === request.petId);
        if (pet) {
            pet.status = 'pending';
        }
        
        return true;
    }

    public getAvailableCount(): { cats: number; dogs: number; total: number } {
        const available = this.mockPets.filter(pet => pet.status === 'available');
        return {
            cats: available.filter(pet => pet.type === 'cat').length,
            dogs: available.filter(pet => pet.type === 'dog').length,
            total: available.length,
        };
    }
}
