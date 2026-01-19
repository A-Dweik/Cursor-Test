export interface Transaction {
    id?: number;
    transactionId: string;
    amount: number;
    currency: string;
    sourceCountry: string;
    senderName: string;
    recipientName: string;
    verificationDate?: Date;
    isVerified?: boolean;
    verificationStatus?: string;
    notes?: string;
}

export interface TransactionVerificationRequest {
    transactionId: string;
    amount: number;
    sourceCountry: string;
    senderName: string;
    recipientName: string;
}

export interface TransactionVerificationResponse {
    isValid: boolean;
    status: string;
    message: string;
    verifiedAt: Date;
    sourceCountry: string;
    transactionDetails?: any;
}

export interface TransactionLog {
    id: number;
    transactionId: string;
    amount: number;
    sourceCountry: string;
    searchedBy: string;
    searchedAt: Date;
    verificationStatus: string;
    isValid: boolean;
}
