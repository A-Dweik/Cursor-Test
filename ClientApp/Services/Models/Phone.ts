export default interface Phone {
    id: number;
    brand: string;
    model: string;
    price: number;
    storage: string;
    ram: string;
    color: string;
    description: string;
    inStock: boolean;
    imageUrl?: string;
    createdDate?: Date;
}
