export interface Product {
    id: string;
    name: string;
    type: 'milk' | 'meat';
    quantity: number;
    unit: string;
    pricePerUnit: number;
    lastUpdated: Date;
    status: 'available' | 'low' | 'out';
}

export interface ProductInput {
    name: string;
    type: 'milk' | 'meat';
    quantity: number;
    unit: string;
    pricePerUnit: number;
}
