import AxiosService from '@/Services/AxiosService';
import LoaderService from '@/Services/LoaderService';
import { Inject, Service } from 'vue-di-container';
import { BookModel, RentalModel, ReviewModel, PurchaseModel } from './BookModel';

@Service()
export default class BooksService {
    @Inject(AxiosService) public axiosService!: AxiosService;
    @Inject(LoaderService) public loaderService!: LoaderService;

    // Mock data for demonstration
    private mockBooks: BookModel[] = [
        {
            id: 1,
            title: 'البرمجة الحديثة بلغة TypeScript',
            author: 'أحمد محمد',
            description: 'كتاب شامل يغطي أساسيات ومتقدمات TypeScript للمطورين',
            coverImage: 'https://via.placeholder.com/200x300/2196F3/FFFFFF?text=TypeScript',
            category: 'البرمجة',
            publishYear: 2023,
            isbn: '978-1-234-56789-0',
            availableCopies: 5,
            totalCopies: 10,
            rentalPricePerDay: 2.5,
            purchasePrice: 45.00,
            isForSale: true,
            rating: 4.5,
            reviewsCount: 42,
            isAvailable: true,
        },
        {
            id: 2,
            title: 'تطوير تطبيقات Vue.js',
            author: 'فاطمة علي',
            description: 'دليل عملي لبناء تطبيقات ويب تفاعلية باستخدام Vue.js',
            coverImage: 'https://via.placeholder.com/200x300/1976D2/FFFFFF?text=Vue.js',
            category: 'البرمجة',
            publishYear: 2022,
            isbn: '978-1-234-56789-1',
            availableCopies: 3,
            totalCopies: 8,
            rentalPricePerDay: 3.0,
            purchasePrice: 55.00,
            isForSale: true,
            rating: 4.8,
            reviewsCount: 67,
            isAvailable: true,
        },
        {
            id: 3,
            title: 'أساسيات تصميم قواعد البيانات',
            author: 'خالد حسن',
            description: 'كتاب متخصص في تصميم وإدارة قواعد البيانات العلائقية',
            coverImage: 'https://via.placeholder.com/200x300/1565C0/FFFFFF?text=Database',
            category: 'قواعد البيانات',
            publishYear: 2021,
            isbn: '978-1-234-56789-2',
            availableCopies: 0,
            totalCopies: 5,
            rentalPricePerDay: 2.0,
            purchasePrice: 40.00,
            isForSale: true,
            rating: 4.2,
            reviewsCount: 28,
            isAvailable: false,
        },
        {
            id: 4,
            title: 'الذكاء الاصطناعي والتعلم الآلي',
            author: 'سارة إبراهيم',
            description: 'مقدمة شاملة للذكاء الاصطناعي وتطبيقات التعلم الآلي',
            coverImage: 'https://via.placeholder.com/200x300/1E88E5/FFFFFF?text=AI+ML',
            category: 'الذكاء الاصطناعي',
            publishYear: 2023,
            isbn: '978-1-234-56789-3',
            availableCopies: 7,
            totalCopies: 12,
            rentalPricePerDay: 3.5,
            purchasePrice: 65.00,
            isForSale: true,
            rating: 4.9,
            reviewsCount: 103,
            isAvailable: true,
        },
        {
            id: 5,
            title: 'أمن المعلومات والحماية السيبرانية',
            author: 'محمود عبدالله',
            description: 'دليل عملي لحماية الأنظمة والشبكات من التهديدات السيبرانية',
            coverImage: 'https://via.placeholder.com/200x300/0D47A1/FFFFFF?text=Security',
            category: 'أمن المعلومات',
            publishYear: 2022,
            isbn: '978-1-234-56789-4',
            availableCopies: 4,
            totalCopies: 6,
            rentalPricePerDay: 2.8,
            purchasePrice: 50.00,
            isForSale: true,
            rating: 4.6,
            reviewsCount: 55,
            isAvailable: true,
        },
        {
            id: 6,
            title: 'تطوير تطبيقات الهاتف المحمول',
            author: 'نورا صالح',
            description: 'كتاب متخصص في تطوير تطبيقات iOS و Android',
            coverImage: 'https://via.placeholder.com/200x300/42A5F5/FFFFFF?text=Mobile',
            category: 'تطوير الهواتف',
            publishYear: 2023,
            isbn: '978-1-234-56789-5',
            availableCopies: 6,
            totalCopies: 10,
            rentalPricePerDay: 3.2,
            purchasePrice: 60.00,
            isForSale: true,
            rating: 4.7,
            reviewsCount: 89,
            isAvailable: true,
        },
    ];

    private mockRentals: RentalModel[] = [
        {
            id: 1,
            bookId: 1,
            bookTitle: 'البرمجة الحديثة بلغة TypeScript',
            userId: '1',
            userName: 'أحمد محمد',
            rentalDate: '2024-01-01',
            dueDate: '2024-01-15',
            returnDate: null,
            status: 'active',
            totalCost: 35.0,
        },
    ];

    private mockPurchases: PurchaseModel[] = [
        {
            id: 1,
            bookId: 2,
            bookTitle: 'تطوير تطبيقات Vue.js',
            userId: '1',
            userName: 'المستخدم الحالي',
            purchaseDate: '2024-01-05',
            price: 55.00,
            status: 'completed',
        },
    ];

    private mockReviews: ReviewModel[] = [
        {
            id: 1,
            bookId: 1,
            userId: '2',
            userName: 'فاطمة علي',
            rating: 5,
            comment: 'كتاب ممتاز وشامل، استفدت منه كثيراً في تعلم TypeScript',
            reviewDate: '2024-01-10',
        },
        {
            id: 2,
            bookId: 1,
            userId: '3',
            userName: 'خالد حسن',
            rating: 4,
            comment: 'كتاب جيد جداً، ولكن بعض الأمثلة تحتاج لمزيد من الشرح',
            reviewDate: '2024-01-08',
        },
    ];

    public async getAllBooks(): Promise<BookModel[]> {
        try {
            // In production, this would be an API call
            // const result = await this.axiosService.axiosInstance.get<BookModel[]>('api/books');
            // return result.data;
            
            // For now, return mock data
            return Promise.resolve(this.mockBooks);
        } catch (exception) {
            return [];
        }
    }

    public async getBookById(id: number): Promise<BookModel | null> {
        try {
            const book = this.mockBooks.find((b) => b.id === id);
            return Promise.resolve(book || null);
        } catch (exception) {
            return null;
        }
    }

    public async getBooksByCategory(category: string): Promise<BookModel[]> {
        try {
            const books = this.mockBooks.filter((b) => b.category === category);
            return Promise.resolve(books);
        } catch (exception) {
            return [];
        }
    }

    public async searchBooks(query: string): Promise<BookModel[]> {
        try {
            const lowerQuery = query.toLowerCase();
            const books = this.mockBooks.filter(
                (b) =>
                    b.title.toLowerCase().includes(lowerQuery) ||
                    b.author.toLowerCase().includes(lowerQuery) ||
                    b.description.toLowerCase().includes(lowerQuery),
            );
            return Promise.resolve(books);
        } catch (exception) {
            return [];
        }
    }

    public async rentBook(bookId: number, rentalDays: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            
            // In production, this would be an API call
            // const result = await this.axiosService.axiosInstance.post('api/rentals', { bookId, rentalDays });
            
            // Mock implementation
            const book = this.mockBooks.find((b) => b.id === bookId);
            if (book && book.availableCopies > 0) {
                book.availableCopies--;
                book.isAvailable = book.availableCopies > 0;
                
                const today = new Date();
                const dueDate = new Date(today);
                dueDate.setDate(dueDate.getDate() + rentalDays);
                
                const rental: RentalModel = {
                    id: this.mockRentals.length + 1,
                    bookId: book.id,
                    bookTitle: book.title,
                    userId: '1',
                    userName: 'المستخدم الحالي',
                    rentalDate: today.toISOString().split('T')[0],
                    dueDate: dueDate.toISOString().split('T')[0],
                    returnDate: null,
                    status: 'active',
                    totalCost: book.rentalPricePerDay * rentalDays,
                };
                
                this.mockRentals.push(rental);
                this.loaderService.HideLoader();
                return Promise.resolve(true);
            }
            
            this.loaderService.HideLoader();
            return Promise.resolve(false);
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async getMyRentals(): Promise<RentalModel[]> {
        try {
            // In production, this would be an API call
            // const result = await this.axiosService.axiosInstance.get<RentalModel[]>('api/rentals/my');
            // return result.data;
            
            return Promise.resolve(this.mockRentals);
        } catch (exception) {
            return [];
        }
    }

    public async returnBook(rentalId: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            
            const rental = this.mockRentals.find((r) => r.id === rentalId);
            if (rental) {
                rental.returnDate = new Date().toISOString().split('T')[0];
                rental.status = 'returned';
                
                const book = this.mockBooks.find((b) => b.id === rental.bookId);
                if (book) {
                    book.availableCopies++;
                    book.isAvailable = true;
                }
                
                this.loaderService.HideLoader();
                return Promise.resolve(true);
            }
            
            this.loaderService.HideLoader();
            return Promise.resolve(false);
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async getBookReviews(bookId: number): Promise<ReviewModel[]> {
        try {
            const reviews = this.mockReviews.filter((r) => r.bookId === bookId);
            return Promise.resolve(reviews);
        } catch (exception) {
            return [];
        }
    }

    public async addReview(bookId: number, rating: number, comment: string): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            
            const review: ReviewModel = {
                id: this.mockReviews.length + 1,
                bookId,
                userId: '1',
                userName: 'المستخدم الحالي',
                rating,
                comment,
                reviewDate: new Date().toISOString().split('T')[0],
            };
            
            this.mockReviews.push(review);
            
            // Update book rating and review count
            const book = this.mockBooks.find((b) => b.id === bookId);
            if (book) {
                const bookReviews = this.mockReviews.filter((r) => r.bookId === bookId);
                const totalRating = bookReviews.reduce((sum, r) => sum + r.rating, 0);
                book.rating = totalRating / bookReviews.length;
                book.reviewsCount = bookReviews.length;
            }
            
            this.loaderService.HideLoader();
            return Promise.resolve(true);
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async purchaseBook(bookId: number): Promise<boolean> {
        try {
            this.loaderService.ShowLoader();
            
            // In production, this would be an API call
            // const result = await this.axiosService.axiosInstance.post('api/purchases', { bookId });
            
            // Mock implementation
            const book = this.mockBooks.find((b) => b.id === bookId);
            if (book && book.isForSale) {
                const purchase: PurchaseModel = {
                    id: this.mockPurchases.length + 1,
                    bookId: book.id,
                    bookTitle: book.title,
                    userId: '1',
                    userName: 'المستخدم الحالي',
                    purchaseDate: new Date().toISOString().split('T')[0],
                    price: book.purchasePrice,
                    status: 'completed',
                };
                
                this.mockPurchases.push(purchase);
                this.loaderService.HideLoader();
                return Promise.resolve(true);
            }
            
            this.loaderService.HideLoader();
            return Promise.resolve(false);
        } catch (exception) {
            this.loaderService.HideLoader();
            return false;
        }
    }

    public async getMyPurchases(): Promise<PurchaseModel[]> {
        try {
            // In production, this would be an API call
            // const result = await this.axiosService.axiosInstance.get<PurchaseModel[]>('api/purchases/my');
            // return result.data;
            
            return Promise.resolve(this.mockPurchases);
        } catch (exception) {
            return [];
        }
    }

    public getCategories(): string[] {
        const categories = Array.from(new Set(this.mockBooks.map((b) => b.category)));
        return categories;
    }
}
