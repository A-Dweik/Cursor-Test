import { Component, Vue} from 'vue-property-decorator';
import WithRender from './CarDetails.html';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarService/CarService';
import CarModel from '@/Services/CarService/CarModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
     components: {
     },
})
export default class CarDetails extends Vue {
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public car: CarModel | null = null;
    public deleteDialog: boolean = false;

    public async mounted() {
        const carId = this.$route.params.id;
        if (carId) {
            await this.loadCar(carId);
        } else {
            this.navigateToCarList();
        }
    }

    private async loadCar(carId: string) {
        this.loading = true;
        try {
            this.car = await this.carService.getCarById(carId);
            if (!this.car) {
                Toaster.error('السيارة غير موجودة');
                this.navigateToCarList();
            }
        } catch (error) {
            console.error('Error loading car:', error);
            Toaster.error('حدث خطأ أثناء تحميل بيانات السيارة');
        } finally {
            this.loading = false;
        }
    }

    private navigateToCarList() {
        this.$router.push({ name: 'cars' });
    }

    private editCar() {
        if (this.car) {
            this.$router.push({ name: 'addCar', query: { id: this.car.id } });
        }
    }

    private openDeleteDialog() {
        this.deleteDialog = true;
    }

    private closeDeleteDialog() {
        this.deleteDialog = false;
    }

    private async confirmDelete() {
        if (this.car) {
            const success = await this.carService.deleteCar(this.car.id);
            if (success) {
                Toaster.success('تم حذف السيارة بنجاح');
                this.navigateToCarList();
            } else {
                Toaster.error('حدث خطأ أثناء حذف السيارة');
            }
        }
        this.closeDeleteDialog();
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

    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    }
}
