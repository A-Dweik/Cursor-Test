import { Component, Vue, Prop } from 'vue-property-decorator';
import WithRender from './IPhoneDetails.html';
import { Inject } from 'vue-di-container';
import IPhoneService, { IPhoneModel } from '@/Services/IPhoneService';

@WithRender
@Component({})
export default class IPhoneDetails extends Vue {
    @Inject(IPhoneService) public iphoneService!: IPhoneService;
    @Prop() public id!: string;

    public loading: boolean = true;
    public iphone: IPhoneModel | null = null;
    public selectedColor: string = '';
    public selectedStorage: string = '';

    async mounted() {
        await this.loadIPhoneDetails();
    }

    private async loadIPhoneDetails() {
        try {
            this.loading = true;
            this.iphone = await this.iphoneService.getIPhoneById(this.id);
            
            if (this.iphone) {
                this.selectedColor = this.iphone.colors[0];
                this.selectedStorage = this.iphone.storage.split('/')[0].trim();
            }
        } catch (error) {
            console.error('Error loading iPhone details:', error);
        } finally {
            this.loading = false;
        }
    }

    public goBack() {
        this.$router.push({ name: 'home' });
    }

    public selectColor(color: string) {
        this.selectedColor = color;
    }

    public selectStorage(storage: string) {
        this.selectedStorage = storage;
    }
}
