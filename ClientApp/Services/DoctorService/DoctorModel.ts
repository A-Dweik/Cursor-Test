export default interface DoctorModel {
    id: number;
    name: string;
    specialization: string;
    experience: number;
    rating: number;
    availableDays: string[];
    availableTimeSlots: TimeSlot[];
    imageUrl?: string;
    description?: string;
}

export interface TimeSlot {
    id: number;
    time: string;
    isAvailable: boolean;
    date?: string;
}
