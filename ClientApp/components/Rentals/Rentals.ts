import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Rentals.html';
import { Inject } from 'vue-di-container';
import RentalService, { Rental } from '@/Services/RentalService';
import CarService, { Car } from '@/Services/CarService';

@WithRender
@Component({})
export default class Rentals extends Vue {
    @Inject(RentalService) public rentalService!: RentalService;
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public rentals: Rental[] = [];
    public availableCars: Car[] = [];
    public dialog: boolean = false;
    public detailsDialog: boolean = false;
    public deleteDialog: boolean = false;
    public valid: boolean = false;
    public search: string = '';

    public editedRental: Rental = this.getEmptyRental();
    public selectedRental: Rental | null = null;
    public rentalToDelete: Rental | null = null;

    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        email: (value: string) => {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !value || pattern.test(value) || 'البريد الإلكتروني غير صحيح';
        },
        phone: (value: string) => {
            const pattern = /^05\d{8}$/;
            return pattern.test(value) || 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05)';
        },
        nationalId: (value: string) => {
            return value.length === 10 || 'رقم الهوية يجب أن يكون 10 أرقام';
        },
    };

    public headers = [
        { text: 'العميل', value: 'customerName', sortable: true },
        { text: 'السيارة', value: 'car.brand', sortable: true },
        { text: 'تاريخ البداية', value: 'startDate', sortable: true },
        { text: 'تاريخ النهاية', value: 'endDate', sortable: true },
        { text: 'التكلفة الإجمالية', value: 'totalCost', sortable: true },
        { text: 'الحالة', value: 'status', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false, align: 'left' },
    ];

    public async mounted() {
        await this.loadRentals();
        await this.loadAvailableCars();
    }

    private async loadRentals() {
        this.loading = true;
        this.rentals = await this.rentalService.getAllRentals();
        this.loading = false;
    }

    private async loadAvailableCars() {
        this.availableCars = await this.carService.getAvailableCars();
    }

    public async openAddDialog() {
        await this.loadAvailableCars();
        this.editedRental = this.getEmptyRental();
        this.dialog = true;
    }

    public openDetailsDialog(rental: Rental) {
        this.selectedRental = rental;
        this.detailsDialog = true;
    }

    public openDeleteDialog(rental: Rental) {
        this.rentalToDelete = rental;
        this.deleteDialog = true;
    }

    public async saveRental() {
        if ((this.$refs.form as any).validate()) {
            const result = await this.rentalService.createRental(this.editedRental);
            if (result) {
                this.dialog = false;
                await this.loadRentals();
                await this.loadAvailableCars();
            }
        }
    }

    public async completeRental(rental: Rental) {
        const result = await this.rentalService.completeRental(rental.id);
        if (result) {
            await this.loadRentals();
            await this.loadAvailableCars();
            if (this.detailsDialog) {
                this.detailsDialog = false;
            }
        }
    }

    public async cancelRental(rental: Rental) {
        const result = await this.rentalService.cancelRental(rental.id);
        if (result) {
            await this.loadRentals();
            await this.loadAvailableCars();
            if (this.detailsDialog) {
                this.detailsDialog = false;
            }
        }
    }

    public async deleteRental() {
        if (this.rentalToDelete) {
            const result = await this.rentalService.deleteRental(this.rentalToDelete.id);
            if (result) {
                this.deleteDialog = false;
                this.rentalToDelete = null;
                await this.loadRentals();
                await this.loadAvailableCars();
            }
        }
    }

    public closeDialog() {
        this.dialog = false;
        this.detailsDialog = false;
        this.deleteDialog = false;
        this.editedRental = this.getEmptyRental();
        this.selectedRental = null;
        this.rentalToDelete = null;
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'Active': return `${baseClasses} status--blue`;
            case 'Completed': return `${baseClasses} status--green`;
            case 'Cancelled': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'Active': return 'نشط';
            case 'Completed': return 'مكتمل';
            case 'Cancelled': return 'ملغي';
            default: return status;
        }
    }

    public formatDate(date: string): string {
        return new Date(date).toLocaleDateString('ar-SA');
    }

    public getCarDisplay(car: any): string {
        return car ? `${car.brand} ${car.model} (${car.plateNumber})` : '';
    }

    private getEmptyRental(): Rental {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {
            id: 0,
            carId: 0,
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            nationalId: '',
            startDate: today.toISOString().substr(0, 10),
            endDate: tomorrow.toISOString().substr(0, 10),
            totalCost: 0,
            status: 'Active',
            notes: '',
            createdDate: new Date().toISOString(),
        };
    }
}
