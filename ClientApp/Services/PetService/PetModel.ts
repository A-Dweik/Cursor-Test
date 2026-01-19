export default interface Pet {
    id: number;
    name: string;
    type: 'cat' | 'dog';
    breed: string;
    age: number;
    gender: 'male' | 'female';
    color: string;
    description: string;
    healthStatus: string;
    vaccinated: boolean;
    neutered: boolean;
    image: string;
    status: 'available' | 'pending' | 'adopted';
    location: string;
    dateAdded: string;
}

export interface AdoptionRequest {
    petId: number;
    adopterName: string;
    adopterPhone: string;
    adopterEmail: string;
    adopterAddress: string;
    hasExperience: boolean;
    hasOtherPets: boolean;
    reasonForAdoption: string;
}
