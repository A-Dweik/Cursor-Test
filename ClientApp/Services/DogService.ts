import { Service, Inject } from 'vue-di-container';
import AxiosService from './AxiosService';
import LoaderService from './LoaderService';
import DogModel, { AdoptionApplicationModel } from '@/Models/DogModel';

@Service()
export default class DogService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration
    private mockDogs: DogModel[] = [
        {
            id: 1,
            name: 'Max',
            nameAr: 'ماكس',
            breed: 'Golden Retriever',
            breedAr: 'جولدن ريتريفر',
            age: 3,
            size: 'large',
            sizeAr: 'كبير',
            gender: 'male',
            genderAr: 'ذكر',
            color: 'Golden',
            colorAr: 'ذهبي',
            personality: 'Friendly, Energetic, Loyal',
            personalityAr: 'ودود، نشيط، مخلص',
            healthStatus: 'Excellent',
            healthStatusAr: 'ممتاز',
            vaccinated: true,
            neutered: true,
            goodWithKids: true,
            goodWithPets: true,
            description: 'Max is a wonderful family dog who loves to play and is great with children.',
            descriptionAr: 'ماكس كلب عائلي رائع يحب اللعب وجيد جداً مع الأطفال.',
            imageUrl: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
            adoptionStatus: 'available',
            adoptionStatusAr: 'متاح للتبني',
            dateAdded: '2024-01-10'
        },
        {
            id: 2,
            name: 'Bella',
            nameAr: 'بيلا',
            breed: 'German Shepherd',
            breedAr: 'الراعي الألماني',
            age: 2,
            size: 'large',
            sizeAr: 'كبير',
            gender: 'female',
            genderAr: 'أنثى',
            color: 'Black and Tan',
            colorAr: 'أسود وبني',
            personality: 'Intelligent, Protective, Loyal',
            personalityAr: 'ذكية، حامية، مخلصة',
            healthStatus: 'Excellent',
            healthStatusAr: 'ممتاز',
            vaccinated: true,
            neutered: true,
            goodWithKids: true,
            goodWithPets: false,
            description: 'Bella is a smart and protective dog, perfect for security and companionship.',
            descriptionAr: 'بيلا كلبة ذكية وحامية، مثالية للحماية والصحبة.',
            imageUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
            adoptionStatus: 'available',
            adoptionStatusAr: 'متاح للتبني',
            dateAdded: '2024-01-12'
        },
        {
            id: 3,
            name: 'Charlie',
            nameAr: 'تشارلي',
            breed: 'Labrador Retriever',
            breedAr: 'لابرادور ريتريفر',
            age: 5,
            size: 'large',
            sizeAr: 'كبير',
            gender: 'male',
            genderAr: 'ذكر',
            color: 'Yellow',
            colorAr: 'أصفر',
            personality: 'Gentle, Friendly, Patient',
            personalityAr: 'لطيف، ودود، صبور',
            healthStatus: 'Good',
            healthStatusAr: 'جيد',
            vaccinated: true,
            neutered: true,
            goodWithKids: true,
            goodWithPets: true,
            description: 'Charlie is a calm and gentle dog, perfect for families with young children.',
            descriptionAr: 'تشارلي كلب هادئ ولطيف، مثالي للعائلات ذات الأطفال الصغار.',
            imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
            adoptionStatus: 'available',
            adoptionStatusAr: 'متاح للتبني',
            dateAdded: '2024-01-08'
        },
        {
            id: 4,
            name: 'Lucy',
            nameAr: 'لوسي',
            breed: 'Beagle',
            breedAr: 'بيجل',
            age: 1,
            size: 'medium',
            sizeAr: 'متوسط',
            gender: 'female',
            genderAr: 'أنثى',
            color: 'Tricolor',
            colorAr: 'ثلاثي الألوان',
            personality: 'Playful, Curious, Friendly',
            personalityAr: 'مرحة، فضولية، ودودة',
            healthStatus: 'Excellent',
            healthStatusAr: 'ممتاز',
            vaccinated: true,
            neutered: false,
            goodWithKids: true,
            goodWithPets: true,
            description: 'Lucy is a young and playful beagle who loves exploring and making new friends.',
            descriptionAr: 'لوسي كلبة صغيرة ومرحة تحب الاستكشاف وتكوين صداقات جديدة.',
            imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
            adoptionStatus: 'available',
            adoptionStatusAr: 'متاح للتبني',
            dateAdded: '2024-01-15'
        },
        {
            id: 5,
            name: 'Rocky',
            nameAr: 'روكي',
            breed: 'Boxer',
            breedAr: 'بوكسر',
            age: 4,
            size: 'large',
            sizeAr: 'كبير',
            gender: 'male',
            genderAr: 'ذكر',
            color: 'Brindle',
            colorAr: 'مخطط',
            personality: 'Energetic, Loyal, Protective',
            personalityAr: 'نشيط، مخلص، حامي',
            healthStatus: 'Good',
            healthStatusAr: 'جيد',
            vaccinated: true,
            neutered: true,
            goodWithKids: true,
            goodWithPets: false,
            description: 'Rocky is an energetic and loyal companion who needs an active family.',
            descriptionAr: 'روكي رفيق نشيط ومخلص يحتاج إلى عائلة نشطة.',
            imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
            adoptionStatus: 'pending',
            adoptionStatusAr: 'قيد المراجعة',
            dateAdded: '2024-01-05'
        }
    ];

    public async getAllDogs(): Promise<DogModel[]> {
        try {
            // In real app, would call API
            // const result = await this.axiosService.axiosInstance.get<DogModel[]>('/api/dogs');
            // return result.data;
            
            // For now, return mock data
            return Promise.resolve(this.mockDogs);
        } catch (error) {
            console.error('Error fetching dogs:', error);
            return [];
        }
    }

    public async getAvailableDogs(): Promise<DogModel[]> {
        const allDogs = await this.getAllDogs();
        return allDogs.filter(dog => dog.adoptionStatus === 'available');
    }

    public async getDogById(id: number): Promise<DogModel | null> {
        const dogs = await this.getAllDogs();
        return dogs.find(dog => dog.id === id) || null;
    }

    public async submitAdoptionApplication(application: AdoptionApplicationModel): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            
            // In real app, would call API
            // await this.axiosService.axiosInstance.post('/api/adoption/apply', application);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.loaderService.HideLoader();
            return true;
        } catch (error) {
            this.loaderService.HideLoader();
            console.error('Error submitting adoption application:', error);
            return false;
        }
    }
}
