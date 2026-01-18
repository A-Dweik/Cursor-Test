import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    ar: {
        iphones: {
            title: 'متجر آيفون',
            description: 'اكتشف أحدث موديلات آيفون',
            viewDetails: 'عرض التفاصيل',
            buyNow: 'اشتر الآن',
            addToCart: 'أضف للسلة',
            specifications: 'المواصفات',
            price: 'السعر',
            storage: 'السعة التخزينية',
            color: 'اللون',
            screen: 'الشاشة',
            chip: 'المعالج',
            camera: 'الكاميرا',
            battery: 'البطارية',
            newArrival: 'وصل حديثاً',
            popular: 'الأكثر مبيعاً',
        },
    },
};

const i18n = new VueI18n({
    locale: 'ar',
    messages,
});

export default i18n;
