import { Component, Vue } from 'vue-property-decorator';
import WithRender from './IndexPage.html';
import { Inject } from 'vue-di-container';
import HouseService from '@/Services/HouseService';
import { HouseModel } from '@/Models/HouseModel';
import AddHouseDialog from '../AddHouseDialog/AddHouseDialog';
import HouseDetailsDialog from '../HouseDetailsDialog/HouseDetailsDialog';

@WithRender
@Component({
    components: {
        AddHouseDialog,
        HouseDetailsDialog,
    },
})
export default class Index extends Vue {
    @Inject(HouseService) public houseService!: HouseService;

    public houses: HouseModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public filterStatus: string = 'all';
    public selectedHouse: HouseModel | null = null;
    public showAddDialog: boolean = false;
    public showDetailsDialog: boolean = false;

    public async mounted() {
        await this.loadHouses();
    }

    public async loadHouses() {
        this.loading = true;
        try {
            this.houses = await this.houseService.getAllHouses();
        } catch (error) {
            console.error('Error loading houses:', error);
        } finally {
            this.loading = false;
        }
    }

    public get filteredHouses(): HouseModel[] {
        let filtered = this.houses;

        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(h =>
                h.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                h.location.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Filter by status
        if (this.filterStatus !== 'all') {
            filtered = filtered.filter(h => h.status === this.filterStatus);
        }

        return filtered;
    }

    public get stats() {
        return {
            total: this.houses.length,
            available: this.houses.filter(h => h.status === 'available').length,
            rented: this.houses.filter(h => h.status === 'rented').length,
            maintenance: this.houses.filter(h => h.status === 'maintenance').length,
        };
    }

    public openAddDialog() {
        this.selectedHouse = null;
        this.showAddDialog = true;
    }

    public openEditDialog(house: HouseModel) {
        this.selectedHouse = { ...house };
        this.showAddDialog = true;
    }

    public openDetailsDialog(house: HouseModel) {
        this.selectedHouse = house;
        this.showDetailsDialog = true;
    }

    public async deleteHouse(house: HouseModel) {
        if (confirm(`هل أنت متأكد من حذف ${house.title}؟`)) {
            try {
                await this.houseService.deleteHouse(house.id);
                await this.loadHouses();
            } catch (error) {
                console.error('Error deleting house:', error);
            }
        }
    }

    public async onHouseSaved() {
        this.showAddDialog = false;
        await this.loadHouses();
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'rented': return `${baseClasses} status--blue`;
            case 'maintenance': return `${baseClasses} status--orange`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متاح';
            case 'rented': return 'مؤجر';
            case 'maintenance': return 'صيانة';
            default: return status;
        }
    }
}
