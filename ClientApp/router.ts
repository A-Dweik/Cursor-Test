import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import PhoneManagement from './components/Admin/PhoneManagement/PhoneManagement';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index,
        },
        {
            path: '/admin/phones',
            name: 'phone-management',
            component: PhoneManagement,
        },
    ],
});
