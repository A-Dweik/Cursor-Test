import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Appointments.html';
import { Inject } from 'vue-di-container';
import DoctorService from '@/Services/DoctorService/DoctorService';
import LabTestService from '@/Services/LabTestService/LabTestService';
import AppointmentService from '@/Services/AppointmentService/AppointmentService';
import DoctorModel, { TimeSlot as DoctorTimeSlot } from '@/Services/DoctorService/DoctorModel';
import LabTestModel, { TimeSlot as LabTestTimeSlot } from '@/Services/LabTestService/LabTestModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class Appointments extends Vue {
    @Inject(DoctorService) public doctorService!: DoctorService;
    @Inject(LabTestService) public labTestService!: LabTestService;
    @Inject(AppointmentService) public appointmentService!: AppointmentService;

    public type: 'doctor' | 'labtest' = 'doctor';
    public entityId: number = 0;
    public entity: DoctorModel | LabTestModel | null = null;

    public form = {
        patientName: '',
        patientPhone: '',
        selectedDate: '',
        selectedTime: '',
        notes: ''
    };

    public valid: boolean = false;
    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        phone: (value: string) => {
            const pattern = /^(05|5)\d{8}$/;
            return pattern.test(value) || 'رقم الجوال غير صحيح';
        }
    };

    public availableDates: string[] = [];
    public availableTimes: Array<DoctorTimeSlot | LabTestTimeSlot> = [];

    async mounted() {
        // Get type and ID from route params
        const typeParam = this.$route.params.type;
        const idParam = this.$route.params.entityId;

        if (typeParam && (typeParam === 'doctor' || typeParam === 'labtest')) {
            this.type = typeParam;
        }

        if (idParam) {
            this.entityId = parseInt(idParam);
            await this.loadEntity();
        }
    }

    async loadEntity() {
        if (this.type === 'doctor') {
            this.entity = await this.doctorService.getDoctorById(this.entityId);
        } else {
            this.entity = await this.labTestService.getLabTestById(this.entityId);
        }

        if (this.entity) {
            this.generateAvailableDates();
        }
    }

    generateAvailableDates() {
        if (!this.entity) return;

        const dates: string[] = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const dayName = this.getDayName(date.getDay());
            if (this.entity.availableDays.includes(dayName)) {
                dates.push(date.toISOString().split('T')[0]);
            }
        }

        this.availableDates = dates;
    }

    getDayName(dayIndex: number): string {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[dayIndex];
    }

    onDateChange() {
        if (this.entity && this.form.selectedDate) {
            this.availableTimes = this.entity.availableTimeSlots;
        }
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

    async submitAppointment() {
        if (!this.valid || !this.entity) {
            return;
        }

        try {
            await this.appointmentService.createAppointment({
                type: this.type,
                entityId: this.entityId,
                entityName: this.entity.name,
                date: this.form.selectedDate,
                time: this.form.selectedTime,
                patientName: this.form.patientName,
                patientPhone: this.form.patientPhone,
                notes: this.form.notes
            });

            Toaster.success('تم حجز الموعد بنجاح');
            this.$router.push('/my-appointments');
        } catch (error) {
            Toaster.error('حدث خطأ أثناء حجز الموعد');
        }
    }

    goBack() {
        this.$router.back();
    }

    getEntityIcon(): string {
        return this.type === 'doctor' ? 'mdi-doctor' : 'mdi-flask';
    }

    getEntityColor(): string {
        return this.type === 'doctor' ? '#1B8354' : '#2563eb';
    }
}
