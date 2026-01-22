export default interface LabTestModel {
    id: number;
    name: string;
    category: string;
    price: number;
    duration: number;
    requiresFasting: boolean;
    availableDays: string[];
    availableTimeSlots: TimeSlot[];
    description?: string;
    preparationInstructions?: string;
}

export interface TimeSlot {
    id: number;
    time: string;
    isAvailable: boolean;
    date?: string;
}
