import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    ar: {
        // Car Selling translations
        carSelling: {
            title: 'تطبيق بيع السيارات',
            description: 'منصة لبيع وشراء السيارات',
            addCar: 'إضافة سيارة',
            viewCars: 'عرض السيارات',
            carDetails: 'تفاصيل السيارة',
            editCar: 'تعديل السيارة',
            deleteCar: 'حذف السيارة',
            noCarsAvailable: 'لا توجد سيارات متاحة',
            brand: 'الماركة',
            model: 'الموديل',
            year: 'السنة',
            price: 'السعر',
            mileage: 'المسافة المقطوعة',
            color: 'اللون',
            status: 'الحالة',
            available: 'متاحة',
            sold: 'مباعة',
            reserved: 'محجوزة',
            save: 'حفظ',
            cancel: 'إلغاء',
            delete: 'حذف',
            edit: 'تعديل',
            view: 'عرض',
            search: 'بحث',
            filter: 'تصفية',
            reset: 'إعادة تعيين',
            loading: 'جاري التحميل...',
            error: 'حدث خطأ',
            success: 'تمت العملية بنجاح',
        },
    },
};

const i18n = new VueI18n({
    locale: 'ar',
    messages,
});

export default i18n;
