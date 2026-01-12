import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import Products from './components/Products/Products';
import Sales from './components/Sales/Sales';
import Customers from './components/Customers/Customers';
import Analytics from './components/Analytics/Analytics';
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
            path: '/products',
            name: 'products',
            component: Products,
        },
        {
            path: '/sales',
            name: 'sales',
            component: Sales,
        },
        {
            path: '/customers',
            name: 'customers',
            component: Customers,
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: Analytics,
        },
    ],
});
