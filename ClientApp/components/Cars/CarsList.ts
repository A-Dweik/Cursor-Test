import { Component, Vue } from 'vue-property-decorator';
import WithRender from './CarsList.html';
import { Inject } from 'vue-di-container';
import CarService, { Car } from '@/Services/CarRental/CarService';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class CarsList extends Vue {
    @Inject(CarService) public carService!: CarService;

    public cars: Car[] = [];
    public dialog: boolean = false;
    public deleteDialog: boolean = false;
    public editedCar: Car = this.getEmptyCar();
    public carToDelete: Car | null = null;
    public editMode: boolean = false;

    public async mounted() {
        await this.loadCars();
    }

    public async loadCars() {
        this.cars = await this.carService.getAllCars();
    }

    public getEmptyCar(): Car {
        return {
            id: 0,
            make: '',
            model: '',
            year: new Date().getFullYear(),
            color: '',
            plateNumber: '',
            dailyRate: 0,
            isAvailable: true,
            imageUrl: 'https://via.placeholder.com/300x200?text=Car',
            description: '',
            createdAt: new Date().toISOString(),
        };
    }

    public addNewCar() {
        this.editedCar = this.getEmptyCar();
        this.editMode = false;
        this.dialog = true;
    }

    public editCar(car: Car) {
        this.editedCar = { ...car };
        this.editMode = true;
        this.dialog = true;
    }

    public confirmDeleteCar(car: Car) {
        this.carToDelete = car;
        this.deleteDialog = true;
    }

    public async deleteCar() {
        if (this.carToDelete) {
            const success = await this.carService.deleteCar(this.carToDelete.id);
            if (success) {
                Toaster.success('تم حذف السيارة بنجاح', 'نجح');
                await this.loadCars();
            } else {
                Toaster.error('فشل حذف السيارة');
            }
        }
        this.deleteDialog = false;
        this.carToDelete = null;
    }

    public async saveCar() {
        if (this.editMode) {
            const success = await this.carService.updateCar(this.editedCar);
            if (success) {
                Toaster.success('تم تحديث السيارة بنجاح', 'نجح');
                await this.loadCars();
                this.dialog = false;
            } else {
                Toaster.error('فشل تحديث السيارة');
            }
        } else {
            const success = await this.carService.addCar(this.editedCar);
            if (success) {
                Toaster.success('تم إضافة السيارة بنجاح', 'نجح');
                await this.loadCars();
                this.dialog = false;
            } else {
                Toaster.error('فشل إضافة السيارة');
            }
        }
    }

    public getStatusClasses(isAvailable: boolean): string {
        return isAvailable 
            ? 'status--text status--rounded status--green' 
            : 'status--text status--rounded status--red';
    }

    public getStatusText(isAvailable: boolean): string {
        return isAvailable ? 'متاحة' : 'غير متاحة';
    }
}
