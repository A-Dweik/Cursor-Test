import { Component, Vue } from 'vue-property-decorator';
import WithRender from './MyAppointments.html';
import { Inject } from 'vue-di-container';
import AppointmentService from '@/Services/AppointmentService/AppointmentService';
import AppointmentModel from '@/Services/AppointmentService/AppointmentModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class MyAppointments extends Vue {
    @Inject(AppointmentService) public appointmentService!: AppointmentService;

    public appointments: AppointmentModel[] = [];
    public loading: boolean = false;
    public selectedAppointment: AppointmentModel | null = null;
    public showCancelDialog: boolean = false;

    async mounted() {
        await this.loadAppointments();
    }

    async loadAppointments() {
        this.loading = true;
        this.appointments = await this.appointmentService.getMyAppointments();
        this.loading = false;
    }

    getStatusText(status: string): string {
        const statusMap: { [key: string]: string } = {
            'pending': 'قيد الانتظار',
            'confirmed': 'مؤكد',
            'completed': 'منتهي',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    }

    getStatusColor(status: string): string {
        const colorMap: { [key: string]: string } = {
            'pending': 'orange',
            'confirmed': 'success',
            'completed': 'blue',
            'cancelled': 'error'
        };
        return colorMap[status] || 'grey';
    }

    getTypeText(type: string): string {
        return type === 'doctor' ? 'موعد مع طبيب' : 'موعد تحليل';
    }

    getTypeIcon(type: string): string {
        return type === 'doctor' ? 'mdi-doctor' : 'mdi-flask';
    }

    getTypeColor(type: string): string {
        return type === 'doctor' ? '#1B8354' : '#2563eb';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    confirmCancelAppointment(appointment: AppointmentModel) {
        this.selectedAppointment = appointment;
        this.showCancelDialog = true;
    }

    async cancelAppointment() {
        if (!this.selectedAppointment) return;

        try {
            await this.appointmentService.cancelAppointment(this.selectedAppointment.id);
            Toaster.success('تم إلغاء الموعد بنجاح');
            await this.loadAppointments();
            this.showCancelDialog = false;
            this.selectedAppointment = null;
        } catch (error) {
            Toaster.error('حدث خطأ أثناء إلغاء الموعد');
        }
    }

    closeCancelDialog() {
        this.showCancelDialog = false;
        this.selectedAppointment = null;
    }
}
