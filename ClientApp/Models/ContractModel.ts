export interface ContractModel {
    id: string;
    contractNumber: string;
    contractDate: string;
    contractType: 'sale' | 'rental';
    assetType: 'car' | 'house';
    assetName: string;
    assetDetails: string;
    firstPartyName: string;
    firstPartyId: string;
    firstPartyPhone: string;
    secondPartyName: string;
    secondPartyId: string;
    secondPartyPhone: string;
    amount: number;
    paymentMethod: string;
    duration?: string;
    startDate?: string;
    endDate?: string;
    notes: string;
    status: 'active' | 'completed' | 'cancelled';
    createdDate: string;
    updatedDate: string;
}

export type ContractType = 'sale' | 'rental';
export type AssetType = 'car' | 'house';
export type ContractStatus = 'active' | 'completed' | 'cancelled';
