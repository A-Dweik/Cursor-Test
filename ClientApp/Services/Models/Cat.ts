export interface Cat {
    id: string;
    name: string;
    age: 'kitten' | 'young' | 'adult';
    gender: 'male' | 'female';
    color: string;
    breed: string;
    description: string;
    vaccinated: boolean;
    neutered: boolean;
    imageUrl: string;
    personality: string[];
    healthStatus: string;
    adoptionFee: number;
    availableForAdoption: boolean;
}
