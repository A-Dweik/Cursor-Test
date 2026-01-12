export interface BookModel {
    id: number;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    category: string;
    publishYear: number;
    isbn: string;
    availableCopies: number;
    totalCopies: number;
    rentalPricePerDay: number;
    purchasePrice: number;
    isForSale: boolean;
    rating: number;
    reviewsCount: number;
    isAvailable: boolean;
}

export interface RentalModel {
    id: number;
    bookId: number;
    bookTitle: string;
    userId: string;
    userName: string;
    rentalDate: string;
    dueDate: string;
    returnDate: string | null;
    status: 'active' | 'returned' | 'overdue';
    totalCost: number;
}

export interface PurchaseModel {
    id: number;
    bookId: number;
    bookTitle: string;
    userId: string;
    userName: string;
    purchaseDate: string;
    price: number;
    status: 'completed' | 'pending' | 'cancelled';
}

export interface ReviewModel {
    id: number;
    bookId: number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    reviewDate: string;
}
