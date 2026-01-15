export default interface DogModel {
    id: number;
    name: string;
    nameAr: string;
    breed: string;
    breedAr: string;
    age: number;
    size: 'small' | 'medium' | 'large';
    sizeAr: string;
    gender: 'male' | 'female';
    genderAr: string;
    color: string;
    colorAr: string;
    personality: string;
    personalityAr: string;
    healthStatus: string;
    healthStatusAr: string;
    vaccinated: boolean;
    neutered: boolean;
    goodWithKids: boolean;
    goodWithPets: boolean;
    description: string;
    descriptionAr: string;
    imageUrl: string;
    adoptionStatus: 'available' | 'pending' | 'adopted';
    adoptionStatusAr: string;
    dateAdded: string;
}

export interface AdoptionApplicationModel {
    dogId: number;
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    address: string;
    hasYard: boolean;
    hasPets: boolean;
    petDetails: string;
    hasChildren: boolean;
    childrenAges: string;
    previousPetExperience: boolean;
    experienceDetails: string;
    reason: string;
}
