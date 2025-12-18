import '@babel/polyfill';
import 'reflect-metadata';
import Vue from 'vue';
import { container } from 'vue-di-container';
import './modules/module';
import './plugins/vuetify';
import router from './router';
import store from './store';
import App from './components/App/App';
import i18n from './plugins/i18n';
import './plugins/RecaptchaKey';
import './registerServiceWorker';
import applicationInitialization from './plugins/application-initialization';

Vue.config.productionTip = false;

applicationInitialization()
  .then(() => {
    // eslint-disable-next-line no-new
    new Vue({
      router,
      container,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  })
  .catch((error: Error) => {
    // If configuration loading fails we still bootstrap the app.
    console.error('Startup failed to load configuration', error);
    // eslint-disable-next-line no-new
    new Vue({
      router,
      container,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  });
