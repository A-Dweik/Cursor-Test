import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarService';
import RentalService from '@/Services/RentalService';

@WithRender
@Component({})
export default class Index extends Vue {
    @Inject(CarService) public carService!: CarService;
    @Inject(RentalService) public rentalService!: RentalService;

    public loading: boolean = false;
    public stats = {
        totalCars: 0,
        availableCars: 0,
        activeRentals: 0,
        totalRevenue: 0
    };

    public async mounted() {
        await this.loadStats();
    }

    private async loadStats() {
        this.loading = true;
        try {
            const cars = await this.carService.getAllCars();
            const rentals = await this.rentalService.getAllRentals();

            this.stats.totalCars = cars.length;
            this.stats.availableCars = cars.filter((c: any) => c.isAvailable).length;
            this.stats.activeRentals = rentals.filter((r: any) => r.status === 'Active').length;
            this.stats.totalRevenue = rentals
                .filter((r: any) => r.status === 'Completed')
                .reduce((sum: number, r: any) => sum + r.totalCost, 0);
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            this.loading = false;
        }
    }
}
