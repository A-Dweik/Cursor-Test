export default interface LandModel {
    id: string;
    title: string;
    description: string;
    location: string;
    city: string;
    area: number;
    pricePerMonth: number;
    status: 'available' | 'rented' | 'pending';
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    features: string[];
    images: string[];
    createdDate: string;
    updatedDate: string;
}
