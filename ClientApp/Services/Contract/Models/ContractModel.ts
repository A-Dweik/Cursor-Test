export default interface ContractModel {
    id: string;
    contractNumber: string;
    contractType: ContractType;
    contractCategory: ContractCategory;
    partyAName: string;
    partyAId: string;
    partyBName: string;
    partyBId: string;
    propertyDescription: string;
    propertyValue: number;
    contractDate: string;
    status: ContractStatus;
    notes: string;
    createdDate: string;
    verificationDate?: string;
}

export enum ContractType {
    RealEstate = 'RealEstate',
    Vehicle = 'Vehicle',
    Commercial = 'Commercial'
}

export enum ContractCategory {
    Sale = 'Sale',
    Purchase = 'Purchase',
    Rent = 'Rent',
    Lease = 'Lease'
}

export enum ContractStatus {
    Pending = 'Pending',
    Verified = 'Verified',
    Rejected = 'Rejected'
}

export interface ContractTypeOption {
    value: ContractType;
    text: string;
    icon: string;
}

export interface ContractCategoryOption {
    value: ContractCategory;
    text: string;
}
