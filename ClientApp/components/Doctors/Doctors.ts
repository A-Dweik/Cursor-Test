import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Doctors.html';
import { Inject } from 'vue-di-container';
import DoctorService from '@/Services/DoctorService/DoctorService';
import DoctorModel from '@/Services/DoctorService/DoctorModel';

@WithRender
@Component({})
export default class Doctors extends Vue {
    @Inject(DoctorService) public doctorService!: DoctorService;

    public doctors: DoctorModel[] = [];
    public filteredDoctors: DoctorModel[] = [];
    public searchQuery: string = '';
    public selectedSpecialization: string = 'الكل';
    public selectedDoctor: DoctorModel | null = null;
    public showBookingDialog: boolean = false;

    public specializations: string[] = [
        'الكل',
        'طب القلب',
        'طب الأطفال',
        'الجراحة العامة',
        'طب الأسنان',
        'العظام',
        'النساء والولادة'
    ];

    async mounted() {
        await this.loadDoctors();
    }

    async loadDoctors() {
        this.doctors = await this.doctorService.getDoctors();
        this.filterDoctors();
    }

    filterDoctors() {
        let filtered = this.doctors;

        if (this.searchQuery) {
            filtered = filtered.filter(d =>
                d.name.includes(this.searchQuery) ||
                d.specialization.includes(this.searchQuery)
            );
        }

        if (this.selectedSpecialization !== 'الكل') {
            filtered = filtered.filter(d => d.specialization === this.selectedSpecialization);
        }

        this.filteredDoctors = filtered;
    }

    selectSpecialization(spec: string) {
        this.selectedSpecialization = spec;
        this.filterDoctors();
    }

    bookAppointment(doctor: DoctorModel) {
        this.selectedDoctor = doctor;
        this.$router.push({
            name: 'appointments',
            params: { type: 'doctor', entityId: doctor.id.toString() }
        });
    }

    getStarColor(rating: number, position: number): string {
        return position <= rating ? '#FFC107' : '#E0E0E0';
    }
}
