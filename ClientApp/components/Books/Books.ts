import { Component, Vue } from 'vue-property-decorator';
import WithRender from './Books.html';
import { Inject } from 'vue-di-container';
import BooksService from '@/Services/Books/BooksService';
import { BookModel, RentalModel, ReviewModel } from '@/Services/Books/BookModel';

@WithRender
@Component({})
export default class Books extends Vue {
    @Inject(BooksService) public booksService!: BooksService;

    public books: BookModel[] = [];
    public filteredBooks: BookModel[] = [];
    public myRentals: RentalModel[] = [];
    public selectedBook: BookModel | null = null;
    public selectedBookReviews: ReviewModel[] = [];
    public loading: boolean = false;
    public searchQuery: string = '';
    public selectedCategory: string = 'الكل';
    public categories: string[] = ['الكل'];
    
    // Dialog states
    public rentDialog: boolean = false;
    public reviewDialog: boolean = false;
    public detailsDialog: boolean = false;
    public myRentalsDialog: boolean = false;
    
    // Rental form
    public rentalDays: number = 7;
    public rentalDaysRules = [
        (v: number) => !!v || 'عدد الأيام مطلوب',
        (v: number) => v > 0 || 'يجب أن يكون العدد أكبر من صفر',
        (v: number) => v <= 30 || 'الحد الأقصى 30 يوم',
    ];
    
    // Review form
    public reviewRating: number = 5;
    public reviewComment: string = '';
    public reviewValid: boolean = false;

    public async mounted() {
        await this.loadBooks();
        await this.loadCategories();
        await this.loadMyRentals();
    }

    public async loadBooks() {
        this.loading = true;
        this.books = await this.booksService.getAllBooks();
        this.filteredBooks = [...this.books];
        this.loading = false;
    }

    public async loadCategories() {
        this.categories = ['الكل', ...this.booksService.getCategories()];
    }

    public async loadMyRentals() {
        this.myRentals = await this.booksService.getMyRentals();
    }

    public filterBooks() {
        let filtered = [...this.books];

        // Filter by category
        if (this.selectedCategory !== 'الكل') {
            filtered = filtered.filter((b) => b.category === this.selectedCategory);
        }

        // Filter by search query
        if (this.searchQuery.trim() !== '') {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (b) =>
                    b.title.toLowerCase().includes(query) ||
                    b.author.toLowerCase().includes(query) ||
                    b.description.toLowerCase().includes(query),
            );
        }

        this.filteredBooks = filtered;
    }

    public onSearchChange() {
        this.filterBooks();
    }

    public onCategoryChange() {
        this.filterBooks();
    }

    public openRentDialog(book: BookModel) {
        if (!book.isAvailable) {
            return;
        }
        this.selectedBook = book;
        this.rentalDays = 7;
        this.rentDialog = true;
    }

    public async confirmRent() {
        if (this.selectedBook) {
            const success = await this.booksService.rentBook(this.selectedBook.id, this.rentalDays);
            if (success) {
                this.rentDialog = false;
                await this.loadBooks();
                await this.loadMyRentals();
                // Show success message
                alert('تم استئجار الكتاب بنجاح!');
            } else {
                alert('فشل استئجار الكتاب. يرجى المحاولة مرة أخرى.');
            }
        }
    }

    public calculateRentalCost(): number {
        if (this.selectedBook) {
            return this.selectedBook.rentalPricePerDay * this.rentalDays;
        }
        return 0;
    }

    public async openDetailsDialog(book: BookModel) {
        this.selectedBook = book;
        this.selectedBookReviews = await this.booksService.getBookReviews(book.id);
        this.detailsDialog = true;
    }

    public openReviewDialog(book: BookModel) {
        this.selectedBook = book;
        this.reviewRating = 5;
        this.reviewComment = '';
        this.reviewDialog = true;
    }

    public async submitReview() {
        if (this.selectedBook && this.reviewValid) {
            const success = await this.booksService.addReview(
                this.selectedBook.id,
                this.reviewRating,
                this.reviewComment,
            );
            if (success) {
                this.reviewDialog = false;
                await this.loadBooks();
                alert('تم إضافة المراجعة بنجاح!');
            } else {
                alert('فشل إضافة المراجعة. يرجى المحاولة مرة أخرى.');
            }
        }
    }

    public async returnBook(rental: RentalModel) {
        const confirm = window.confirm('هل أنت متأكد من إرجاع هذا الكتاب؟');
        if (confirm) {
            const success = await this.booksService.returnBook(rental.id);
            if (success) {
                await this.loadBooks();
                await this.loadMyRentals();
                alert('تم إرجاع الكتاب بنجاح!');
            } else {
                alert('فشل إرجاع الكتاب. يرجى المحاولة مرة أخرى.');
            }
        }
    }

    public getStatusClasses(status: string): string {
        const baseClasses = 'status--text status--rounded';
        switch (status) {
            case 'active':
                return `${baseClasses} status--green`;
            case 'overdue':
                return `${baseClasses} status--red`;
            case 'returned':
                return `${baseClasses} status--blue`;
            default:
                return baseClasses;
        }
    }

    public getStatusText(status: string): string {
        switch (status) {
            case 'active':
                return 'نشط';
            case 'overdue':
                return 'متأخر';
            case 'returned':
                return 'تم الإرجاع';
            default:
                return status;
        }
    }

    public openMyRentalsDialog() {
        this.myRentalsDialog = true;
    }
}
