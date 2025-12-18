import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  ar: {
    welcome: 'مرحباً {name}',
    addTodoPlaceholder: 'أدخل مهمة جديدة',
    addTodoCta: 'إضافة',
    emptyState: 'لا توجد مهام بعد. أضف أول مهمة الآن.',
    userGreeting: 'مرحباً {name}'
  }
};

const i18n = new VueI18n({
  locale: 'ar',
  fallbackLocale: 'ar',
  messages
});

export default i18n;
