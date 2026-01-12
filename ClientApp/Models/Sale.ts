export interface Sale {
    id: string;
    customerId: string;
    customerName: string;
    productId: string;
    productName: string;
    productType: 'milk' | 'meat';
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    saleDate: Date;
    paymentStatus: 'paid' | 'pending' | 'partial';
    notes?: string;
}

export interface SaleInput {
    customerId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    paymentStatus: 'paid' | 'pending' | 'partial';
    notes?: string;
}
