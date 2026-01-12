import { Component, Vue} from 'vue-property-decorator';
import WithRender from './CarList.html';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarService/CarService';
import CarModel from '@/Services/CarService/CarModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
     components: {
     },
})
export default class CarList extends Vue {
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public cars: CarModel[] = [];
    public filteredCars: CarModel[] = [];
    public searchTerm: string = '';
    public selectedStatus: string = 'all';
    public deleteDialog: boolean = false;
    public carToDelete: CarModel | null = null;

    public statusOptions = [
        { text: 'الكل', value: 'all' },
        { text: 'متاحة', value: 'available' },
        { text: 'محجوزة', value: 'reserved' },
        { text: 'مباعة', value: 'sold' },
    ];

    public async mounted() {
        await this.loadCars();
    }

    private async loadCars() {
        this.loading = true;
        try {
            this.cars = await this.carService.getAllCars();
            this.applyFilters();
        } catch (error) {
            console.error('Error loading cars:', error);
            Toaster.error('حدث خطأ أثناء تحميل السيارات');
        } finally {
            this.loading = false;
        }
    }

    private applyFilters() {
        let filtered = [...this.cars];

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter((car) =>
                car.brand.toLowerCase().includes(term) ||
                car.model.toLowerCase().includes(term) ||
                car.color.toLowerCase().includes(term),
            );
        }

        // Filter by status
        if (this.selectedStatus !== 'all') {
            filtered = filtered.filter((car) => car.status === this.selectedStatus);
        }

        this.filteredCars = filtered;
    }

    private onSearchChange() {
        this.applyFilters();
    }

    private onStatusChange() {
        this.applyFilters();
    }

    private viewCarDetails(carId: string) {
        this.$router.push({ name: 'carDetails', params: { id: carId } });
    }

    private editCar(carId: string) {
        this.$router.push({ name: 'addCar', query: { id: carId } });
    }

    private openDeleteDialog(car: CarModel) {
        this.carToDelete = car;
        this.deleteDialog = true;
    }

    private closeDeleteDialog() {
        this.deleteDialog = false;
        this.carToDelete = null;
    }

    private async confirmDelete() {
        if (this.carToDelete) {
            const success = await this.carService.deleteCar(this.carToDelete.id);
            if (success) {
                Toaster.success('تم حذف السيارة بنجاح');
                await this.loadCars();
            } else {
                Toaster.error('حدث خطأ أثناء حذف السيارة');
            }
        }
        this.closeDeleteDialog();
    }

    private navigateToAddCar() {
        this.$router.push({ name: 'addCar' });
    }

    private getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'reserved': return `${baseClasses} status--orange`;
            case 'sold': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    private getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاحة';
            case 'reserved': return 'محجوزة';
            case 'sold': return 'مباعة';
            default: return status;
        }
    }
}
