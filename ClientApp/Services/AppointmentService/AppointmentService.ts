import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import AppointmentModel, { CreateAppointmentRequest } from './AppointmentModel';

@Service()
export default class AppointmentService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    private appointments: AppointmentModel[] = [];
    private nextId: number = 1;

    public async getMyAppointments(): Promise<AppointmentModel[]> {
        try {
            this.loaderService.ShowLoader();
            // In real app, fetch from API
            // For now, return stored appointments
            this.loaderService.HideLoader();
            return this.appointments;
        } catch (exception) {
            this.loaderService.HideLoader();
            return [];
        }
    }

    public async createAppointment(request: CreateAppointmentRequest): Promise<AppointmentModel> {
        try {
            this.loaderService.ShowLoader();
            
            // Create new appointment
            const newAppointment: AppointmentModel = {
                id: this.nextId++,
                type: request.type,
                entityId: request.entityId,
                entityName: request.entityName,
                date: request.date,
                time: request.time,
                status: 'confirmed',
                patientName: request.patientName,
                patientPhone: request.patientPhone,
                notes: request.notes,
                createdAt: new Date().toISOString()
            };

            // Store appointment
            this.appointments.push(newAppointment);
            
            this.loaderService.HideLoader();
            return newAppointment;
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }

    public async cancelAppointment(id: number): Promise<void> {
        try {
            this.loaderService.ShowLoader();
            
            const appointment = this.appointments.find(a => a.id === id);
            if (appointment) {
                appointment.status = 'cancelled';
            }
            
            this.loaderService.HideLoader();
        } catch (exception) {
            this.loaderService.HideLoader();
            throw exception;
        }
    }
}
