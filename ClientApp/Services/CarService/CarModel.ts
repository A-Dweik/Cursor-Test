export default interface CarModel {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    status: 'available' | 'sold' | 'reserved';
    description: string;
    imageUrl: string;
    createdDate: string;
    updatedDate: string;
}
