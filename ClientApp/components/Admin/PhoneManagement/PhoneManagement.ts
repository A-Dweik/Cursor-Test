import { Component, Vue } from 'vue-property-decorator';
import WithRender from './PhoneManagement.html';
import { Inject } from 'vue-di-container';
import PhoneService from '@/Services/PhoneService';
import Phone from '@/Services/Models/Phone';

@WithRender
@Component({
    components: {},
})
export default class PhoneManagement extends Vue {
    @Inject(PhoneService) public phoneService!: PhoneService;

    public phones: Phone[] = [];
    public searchQuery: string = '';
    public loading: boolean = false;
    public dialog: boolean = false;
    public deleteDialog: boolean = false;
    public editedIndex: number = -1;
    public editedItem: Phone = this.getDefaultPhone();
    public itemToDelete: Phone | null = null;

    public headers = [
        { text: 'ID', value: 'id', align: 'right' },
        { text: 'العلامة التجارية', value: 'brand', align: 'right' },
        { text: 'الموديل', value: 'model', align: 'right' },
        { text: 'السعر', value: 'price', align: 'right' },
        { text: 'التخزين', value: 'storage', align: 'right' },
        { text: 'الرام', value: 'ram', align: 'right' },
        { text: 'اللون', value: 'color', align: 'right' },
        { text: 'الحالة', value: 'inStock', align: 'center' },
        { text: 'الإجراءات', value: 'actions', sortable: false, align: 'center' },
    ];

    public async mounted() {
        await this.loadPhones();
    }

    public async loadPhones() {
        this.loading = true;
        this.phones = await this.phoneService.getAllPhones();
        this.loading = false;
    }

    public async searchPhones() {
        if (this.searchQuery.trim() === '') {
            await this.loadPhones();
        } else {
            this.loading = true;
            this.phones = await this.phoneService.searchPhones(this.searchQuery);
            this.loading = false;
        }
    }

    public openAddDialog() {
        this.editedIndex = -1;
        this.editedItem = this.getDefaultPhone();
        this.dialog = true;
    }

    public openEditDialog(item: Phone) {
        this.editedIndex = this.phones.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
    }

    public closeDialog() {
        this.dialog = false;
        setTimeout(() => {
            this.editedItem = this.getDefaultPhone();
            this.editedIndex = -1;
        }, 300);
    }

    public async savePhone() {
        if (this.editedIndex > -1) {
            // Update existing phone
            const success = await this.phoneService.updatePhone(this.editedItem.id, this.editedItem);
            if (success) {
                Object.assign(this.phones[this.editedIndex], this.editedItem);
                this.closeDialog();
            }
        } else {
            // Add new phone
            const success = await this.phoneService.createPhone(this.editedItem);
            if (success) {
                await this.loadPhones();
                this.closeDialog();
            }
        }
    }

    public openDeleteDialog(item: Phone) {
        this.itemToDelete = item;
        this.deleteDialog = true;
    }

    public closeDeleteDialog() {
        this.deleteDialog = false;
        this.itemToDelete = null;
    }

    public async confirmDelete() {
        if (this.itemToDelete) {
            const success = await this.phoneService.deletePhone(this.itemToDelete.id);
            if (success) {
                await this.loadPhones();
                this.closeDeleteDialog();
            }
        }
    }

    public getStatusColor(inStock: boolean): string {
        return inStock ? 'success' : 'error';
    }

    public getStatusText(inStock: boolean): string {
        return inStock ? 'متوفر' : 'غير متوفر';
    }

    private getDefaultPhone(): Phone {
        return {
            id: 0,
            brand: '',
            model: '',
            price: 0,
            storage: '',
            ram: '',
            color: '',
            description: '',
            inStock: true,
            imageUrl: '',
        };
    }

    get formTitle(): string {
        return this.editedIndex === -1 ? 'إضافة هاتف جديد' : 'تعديل الهاتف';
    }
}
