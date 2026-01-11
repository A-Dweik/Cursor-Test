export interface HouseModel {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    status: 'available' | 'rented' | 'maintenance';
    imageUrl?: string;
    ownerName?: string;
    ownerPhone?: string;
    createdDate?: Date;
    features?: string[];
}
