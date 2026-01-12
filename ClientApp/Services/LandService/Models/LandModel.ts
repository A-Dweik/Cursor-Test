export default interface LandModel {
    id: string;
    title: string;
    description: string;
    area: number;
    price: number;
    location: string;
    city: string;
    district: string;
    latitude?: number;
    longitude?: number;
    status: 'available' | 'pending' | 'sold' | 'reserved';
    ownerName: string;
    ownerPhone: string;
    deedNumber?: string;
    planNumber?: string;
    landType: 'residential' | 'commercial' | 'agricultural' | 'industrial';
    hasElectricity: boolean;
    hasWater: boolean;
    hasRoads: boolean;
    images: string[];
    documents: string[];
    createdDate: string;
    updatedDate?: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    notes?: string;
}
