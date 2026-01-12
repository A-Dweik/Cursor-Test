import { Component, Vue} from 'vue-property-decorator';
import WithRender from './AddCar.html';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarService/CarService';
import CarModel from '@/Services/CarService/CarModel';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({
     components: {
     },
})
export default class AddCar extends Vue {
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public isEditMode: boolean = false;
    public valid: boolean = false;

    public car: CarModel = {
        id: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        color: '',
        status: 'available',
        description: '',
        imageUrl: '',
        createdDate: '',
        updatedDate: '',
    };

    public rules = {
        required: (value: string | number) => !!value || 'هذا الحقل مطلوب',
        minValue: (min: number) => (value: number) =>
            value >= min || `القيمة يجب أن تكون أكبر من أو تساوي ${min}`,
        maxYear: (value: number) =>
            value <= new Date().getFullYear() + 1 || 'السنة غير صحيحة',
    };

    public statusOptions = [
        { text: 'متاحة', value: 'available' },
        { text: 'محجوزة', value: 'reserved' },
        { text: 'مباعة', value: 'sold' },
    ];

    public currentYear = new Date().getFullYear();

    public async mounted() {
        const carId = this.$route.query.id as string;
        if (carId) {
            this.isEditMode = true;
            await this.loadCar(carId);
        }
    }

    private async loadCar(carId: string) {
        this.loading = true;
        try {
            const car = await this.carService.getCarById(carId);
            if (car) {
                this.car = { ...car };
            } else {
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

    private async saveCar() {
        const form = this.$refs.carForm as any;
        if (form.validate()) {
            this.loading = true;
            try {
                let success = false;
                if (this.isEditMode) {
                    success = await this.carService.updateCar(this.car);
                    if (success) {
                        Toaster.success('تم تحديث السيارة بنجاح');
                    }
                } else {
                    success = await this.carService.addCar(this.car);
                    if (success) {
                        Toaster.success('تم إضافة السيارة بنجاح');
                    }
                }

                if (success) {
                    this.navigateToCarList();
                } else {
                    Toaster.error('حدث خطأ أثناء حفظ البيانات');
                }
            } catch (error) {
                console.error('Error saving car:', error);
                Toaster.error('حدث خطأ أثناء حفظ البيانات');
            } finally {
                this.loading = false;
            }
        }
    }

    private cancel() {
        this.navigateToCarList();
    }

    private navigateToCarList() {
        this.$router.push({ name: 'cars' });
    }
}
