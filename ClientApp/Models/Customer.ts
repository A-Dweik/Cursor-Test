export interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address?: string;
    totalPurchases: number;
    lastPurchaseDate?: Date;
    status: 'active' | 'inactive';
    balance: number;
}

export interface CustomerInput {
    name: string;
    phone: string;
    email?: string;
    address?: string;
}
