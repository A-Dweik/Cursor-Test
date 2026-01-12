import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarService/CarService';
import CarModel from '@/Services/CarService/CarModel';

@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    @Inject(CarService) public carService!: CarService;

    public loading: boolean = false;
    public totalCars: number = 0;
    public availableCars: number = 0;
    public soldCars: number = 0;
    public reservedCars: number = 0;
    public recentCars: CarModel[] = [];

    public async mounted() {
        await this.loadStats();
    }

    private async loadStats() {
        this.loading = true;
        try {
            const cars = await this.carService.getAllCars();
            this.totalCars = cars.length;
            this.availableCars = cars.filter((c) => c.status === 'available').length;
            this.soldCars = cars.filter((c) => c.status === 'sold').length;
            this.reservedCars = cars.filter((c) => c.status === 'reserved').length;
            // Get last 3 cars
            this.recentCars = cars.slice(-3).reverse();
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            this.loading = false;
        }
    }

    private navigateToCars() {
        this.$router.push({ name: 'cars' });
    }

    private navigateToAddCar() {
        this.$router.push({ name: 'addCar' });
    }

    private viewCarDetails(carId: string) {
        this.$router.push({ name: 'carDetails', params: { id: carId } });
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
