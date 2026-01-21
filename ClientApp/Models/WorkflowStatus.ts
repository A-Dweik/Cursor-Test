/**
 * Workflow Status Enum
 * Defines the approval stages for contract verification
 */
export enum WorkflowStatus {
    /** Contract just submitted, awaiting initial review */
    Submitted = 'submitted',
    
    /** Initial approval granted by reviewer, awaiting manager review */
    InitialApproved = 'initial_approved',
    
    /** Manager approval granted, awaiting final approval */
    ManagerApproved = 'manager_approved',
    
    /** Final approval granted, contract is fully verified */
    FinalApproved = 'final_approved',
    
    /** Contract rejected at any stage */
    Rejected = 'rejected'
}

/**
 * Workflow Stage Information
 */
export interface WorkflowStage {
    status: WorkflowStatus;
    label: string;
    labelAr: string;
    icon: string;
    color: string;
    order: number;
}

/**
 * Workflow History Entry
 */
export interface WorkflowHistory {
    stage: WorkflowStatus;
    action: 'approved' | 'rejected';
    by: string;
    date: string;
    notes?: string;
}

/**
 * Contract Model with Workflow
 */
export interface ContractModel {
    id: number;
    type: 'sale' | 'rental';
    propertyType: string;
    location: string;
    price: string;
    seller?: string;
    buyer?: string;
    owner?: string;
    tenant?: string;
    workflowStatus: WorkflowStatus;
    date: string;
    contractNumber: string;
    workflowHistory: WorkflowHistory[];
}
