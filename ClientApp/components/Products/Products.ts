import { Component, Vue } from 'vue-property-decorator';
import { Inject } from 'vue-di-container';
import WithRender from './Products.html';
import ProductService from '@/Services/Business/ProductService';
import { Product, ProductInput } from '@/Models/Product';
import { Toaster } from '@/Services/toast';

@WithRender
@Component({})
export default class Products extends Vue {
    @Inject(ProductService) private productService!: ProductService;

    public products: Product[] = [];
    public loading: boolean = false;
    public showDialog: boolean = false;
    public editMode: boolean = false;
    public currentProduct: ProductInput = this.getEmptyProduct();
    public editingId: string = '';

    public headers = [
        { text: 'اسم المنتج', value: 'name', sortable: true },
        { text: 'النوع', value: 'type', sortable: true },
        { text: 'الكمية', value: 'quantity', sortable: true },
        { text: 'الوحدة', value: 'unit', sortable: false },
        { text: 'السعر لكل وحدة', value: 'pricePerUnit', sortable: true },
        { text: 'الحالة', value: 'status', sortable: true },
        { text: 'الإجراءات', value: 'actions', sortable: false }
    ];

    public async mounted() {
        await this.loadProducts();
    }

    private async loadProducts() {
        this.loading = true;
        try {
            this.products = await this.productService.getAllProducts();
        } catch (error) {
            Toaster.error('فشل تحميل المنتجات');
        } finally {
            this.loading = false;
        }
    }

    public openAddDialog() {
        this.editMode = false;
        this.currentProduct = this.getEmptyProduct();
        this.showDialog = true;
    }

    public openEditDialog(product: Product) {
        this.editMode = true;
        this.editingId = product.id;
        this.currentProduct = {
            name: product.name,
            type: product.type,
            quantity: product.quantity,
            unit: product.unit,
            pricePerUnit: product.pricePerUnit
        };
        this.showDialog = true;
    }

    public async saveProduct() {
        try {
            if (this.editMode) {
                await this.productService.updateProduct(this.editingId, this.currentProduct);
                Toaster.success('تم تحديث المنتج بنجاح', 'نجاح');
            } else {
                await this.productService.addProduct(this.currentProduct);
                Toaster.success('تم إضافة المنتج بنجاح', 'نجاح');
            }
            await this.loadProducts();
            this.closeDialog();
        } catch (error) {
            Toaster.error('فشل حفظ المنتج');
        }
    }

    public async deleteProduct(product: Product) {
        if (confirm(`هل أنت متأكد من حذف المنتج "${product.name}"؟`)) {
            try {
                await this.productService.deleteProduct(product.id);
                Toaster.success('تم حذف المنتج بنجاح', 'نجاح');
                await this.loadProducts();
            } catch (error) {
                Toaster.error('فشل حذف المنتج');
            }
        }
    }

    public closeDialog() {
        this.showDialog = false;
        this.currentProduct = this.getEmptyProduct();
        this.editingId = '';
    }

    private getEmptyProduct(): ProductInput {
        return {
            name: '',
            type: 'milk',
            quantity: 0,
            unit: 'لتر',
            pricePerUnit: 0
        };
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'available': return `${baseClasses} status--green`;
            case 'low': return `${baseClasses} status--orange`;
            case 'out': return `${baseClasses} status--red`;
            default: return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'available': return 'متوفر';
            case 'low': return 'كمية قليلة';
            case 'out': return 'غير متوفر';
            default: return status;
        }
    }

    public getTypeText(type: string): string {
        return type === 'milk' ? 'حليب' : 'لحم';
    }
}
