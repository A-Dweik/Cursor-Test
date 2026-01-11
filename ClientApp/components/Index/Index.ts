import { Component, Vue} from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import pdf, { ViewerpdfType } from '@t2/Viewerpdf';
import { Inject } from 'vue-di-container';
import CarService from '@/Services/CarRental/CarService';
import RentalService from '@/Services/CarRental/RentalService';


@WithRender
@Component({
     components: {
     },
})
export default class Index extends Vue {
    @Inject(CarService) public carService!: CarService;
    @Inject(RentalService) public rentalService!: RentalService;

    public totalCars: number = 0;
    public activeRentals: number = 0;
    public loading: boolean = true;

    public async mounted() {
        await this.loadStatistics();
    }

    public async loadStatistics() {
        this.loading = true;
        const cars = await this.carService.getAllCars();
        const rentals = await this.rentalService.getActiveRentals();
        
        this.totalCars = cars.length;
        this.activeRentals = rentals.length;
        this.loading = false;
    }
}
