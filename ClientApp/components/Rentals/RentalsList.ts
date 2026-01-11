import { Component, Vue } from 'vue-property-decorator';
import WithRender from './RentalsList.html';
import { Inject } from 'vue-di-container';
import RentalService, { Rental } from '@/Services/CarRental/RentalService';
import CarService, { Car } from '@/Services/CarRental/CarService';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class RentalsList extends Vue {
    @Inject(RentalService) public rentalService!: RentalService;
    @Inject(CarService) public carService!: CarService;

    public rentals: Rental[] = [];
    public availableCars: Car[] = [];
    public dialog: boolean = false;
    public deleteDialog: boolean = false;
    public editedRental: Rental = this.getEmptyRental();
    public rentalToDelete: Rental | null = null;
    public tab: string = 'all';

    public async mounted() {
        await this.loadRentals();
        await this.loadAvailableCars();
    }

    public async loadRentals() {
        this.rentals = await this.rentalService.getAllRentals();
    }

    public async loadAvailableCars() {
        this.availableCars = await this.carService.getAvailableCars();
    }

    public getEmptyRental(): Rental {
        return {
            id: 0,
            carId: 0,
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            customerIdNumber: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            totalAmount: 0,
            status: 'active',
            notes: '',
            createdAt: new Date().toISOString(),
        };
    }

    public get filteredRentals(): Rental[] {
        if (this.tab === 'active') {
            return this.rentals.filter(r => r.status === 'active');
        } else if (this.tab === 'completed') {
            return this.rentals.filter(r => r.status === 'completed');
        }
        return this.rentals;
    }

    public addNewRental() {
        this.editedRental = this.getEmptyRental();
        this.dialog = true;
    }

    public confirmDeleteRental(rental: Rental) {
        this.rentalToDelete = rental;
        this.deleteDialog = true;
    }

    public async deleteRental() {
        if (this.rentalToDelete) {
            const success = await this.rentalService.deleteRental(this.rentalToDelete.id);
            if (success) {
                Toaster.success('تم حذف الحجز بنجاح', 'نجح');
                await this.loadRentals();
                await this.loadAvailableCars();
            } else {
                Toaster.error('فشل حذف الحجز');
            }
        }
        this.deleteDialog = false;
        this.rentalToDelete = null;
    }

    public async saveRental() {
        const success = await this.rentalService.addRental(this.editedRental);
        if (success) {
            Toaster.success('تم إضافة الحجز بنجاح', 'نجح');
            await this.loadRentals();
            await this.loadAvailableCars();
            this.dialog = false;
        } else {
            Toaster.error('فشل إضافة الحجز');
        }
    }

    public async completeRental(rental: Rental) {
        const success = await this.rentalService.completeRental(rental.id);
        if (success) {
            Toaster.success('تم إتمام الحجز بنجاح', 'نجح');
            await this.loadRentals();
            await this.loadAvailableCars();
        } else {
            Toaster.error('فشل إتمام الحجز');
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'active': return `${baseClasses} status--green`;
            case 'completed': return `${baseClasses} status--blue`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'active': return 'نشط';
            case 'completed': return 'مكتمل';
            default: return status;
        }
    }

    public formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }
}
