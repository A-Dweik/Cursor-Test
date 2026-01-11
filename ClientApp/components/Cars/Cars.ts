import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Cars.html';
import { Inject } from 'vue-di-container';
import CarService, { Car } from '@/Services/CarService';

@WithRender
@Component({})
export default class Cars extends Vue {
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public cars: Car[] = [];
    public dialog: boolean = false;
    public editDialog: boolean = false;
    public deleteDialog: boolean = false;
    public valid: boolean = false;
    public search: string = '';

    public editedCar: Car = this.getEmptyCar();
    public carToDelete: Car | null = null;

    public rules = {
        required: (value: string) => !!value || 'هذا الحقل مطلوب',
        number: (value: number) => value > 0 || 'القيمة يجب أن تكون أكبر من صفر',
    };

    public headers = [
        { text: 'الماركة', value: 'brand', sortable: true },
        { text: 'الموديل', value: 'model', sortable: true },
        { text: 'السنة', value: 'year', sortable: true },
        { text: 'اللون', value: 'color', sortable: true },
        { text: 'رقم اللوحة', value: 'plateNumber', sortable: true },
        { text: 'السعر اليومي', value: 'dailyRate', sortable: true },
        { text: 'الحالة', value: 'isAvailable', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false, align: 'left' },
    ];

    public async mounted() {
        await this.loadCars();
    }

    private async loadCars() {
        this.loading = true;
        this.cars = await this.carService.getAllCars();
        this.loading = false;
    }

    public openAddDialog() {
        this.editedCar = this.getEmptyCar();
        this.dialog = true;
    }

    public openEditDialog(car: Car) {
        this.editedCar = { ...car };
        this.editDialog = true;
    }

    public openDeleteDialog(car: Car) {
        this.carToDelete = car;
        this.deleteDialog = true;
    }

    public async saveCar() {
        if ((this.$refs.form as any).validate()) {
            const result = await this.carService.createCar(this.editedCar);
            if (result) {
                this.dialog = false;
                await this.loadCars();
            }
        }
    }

    public async updateCar() {
        if ((this.$refs.editForm as any).validate()) {
            const result = await this.carService.updateCar(this.editedCar.id, this.editedCar);
            if (result) {
                this.editDialog = false;
                await this.loadCars();
            }
        }
    }

    public async deleteCar() {
        if (this.carToDelete) {
            const result = await this.carService.deleteCar(this.carToDelete.id);
            if (result) {
                this.deleteDialog = false;
                this.carToDelete = null;
                await this.loadCars();
            }
        }
    }

    public closeDialog() {
        this.dialog = false;
        this.editDialog = false;
        this.deleteDialog = false;
        this.editedCar = this.getEmptyCar();
        this.carToDelete = null;
    }

    public getStatusClasses(isAvailable: boolean): string {
        return isAvailable
            ? 'status--text status--rounded status--green'
            : 'status--text status--rounded status--red';
    }

    public getStatusText(isAvailable: boolean): string {
        return isAvailable ? 'متاحة' : 'مؤجرة';
    }

    private getEmptyCar(): Car {
        return {
            id: 0,
            brand: '',
            model: '',
            year: new Date().getFullYear(),
            color: '',
            plateNumber: '',
            dailyRate: 0,
            isAvailable: true,
            description: '',
            fuelType: 'بنزين',
            seats: 5,
            transmission: 'أوتوماتيك',
        };
    }
}
