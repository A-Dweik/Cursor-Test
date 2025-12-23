import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import i18n from '@/plugins/i18n';
import App from './components/App/App';
import router from './router';
import './registerServiceWorker';
import { VueDiContainer } from 'vue-di-container';
import AxiosService from './Services/AxiosService';
import LoaderService from './Services/LoaderService';
import LeaveRequestService from './Services/LeaveRequestService';
import initializeApplication from './plugins/application-initialization';
import TelemetryService from './Services/TelemetryService';

Vue.config.productionTip = false;
Vue.use(VueDiContainer);

declare module 'vue/types/vue' {
    interface Vue {
        $appInsights: any;
    }
}

declare global {
    interface Window {
        $config: any;
        ShowLoader(): void;
        HideLoader(): void;
    }
}

initializeApplication().then((initialize) => {
    new Vue({
        i18n,
        router,
        diProvide: [
            AxiosService,
            LoaderService,
            TelemetryService,
            LeaveRequestService,
        ],
        render: (h) => h(App),
    }).$mount('#app');
},
);
