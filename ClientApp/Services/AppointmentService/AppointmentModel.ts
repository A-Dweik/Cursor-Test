export default interface AppointmentModel {
    id: number;
    type: 'doctor' | 'labtest';
    entityId: number;
    entityName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    patientName: string;
    patientPhone: string;
    notes?: string;
    createdAt: string;
}

export interface CreateAppointmentRequest {
    type: 'doctor' | 'labtest';
    entityId: number;
    entityName: string;
    date: string;
    time: string;
    patientName: string;
    patientPhone: string;
    notes?: string;
}
