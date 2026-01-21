// Enums
export enum ContractType {
    Sale = 1,
    Rental = 2
}

export enum ContractStatus {
    Pending = 1,
    UnderReview = 2,
    Verified = 3,
    Rejected = 4
}

// Main Contract model
export interface Contract {
    id: number;
    contractNumber: string;
    type: ContractType;
    status: ContractStatus;
    sellerName: string;
    buyerName: string;
    propertyAddress: string;
    contractAmount: number;
    createdBy: string;
    createdAt: string;
    updatedAt?: string;
}

// Create Contract model
export interface ContractCreateModel {
    contractNumber: string;
    type: ContractType;
    sellerName: string;
    buyerName: string;
    propertyAddress: string;
    contractAmount: number;
}

// Status Update model
export interface ContractStatusUpdateModel {
    contractId: number;
    newStatus: ContractStatus;
    changedBy: string;
    comment?: string;
}

// Contract History model
export interface ContractHistory {
    id: number;
    contractId: number;
    oldStatus: ContractStatus;
    newStatus: ContractStatus;
    changedBy: string;
    changedAt: string;
    comment?: string;
}

// Statistics model
export interface ContractStatistics {
    totalContracts: number;
    pendingContracts: number;
    underReviewContracts: number;
    verifiedContracts: number;
    rejectedContracts: number;
}

// Filter model for querying contracts
export interface ContractFilterModel {
    type?: ContractType;
    status?: ContractStatus;
    search?: string;
    createdBy?: string;
}
