import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
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
            path: '/product/:id',
            name: 'product-details',
            component: ProductDetails,
        },
    ],
});
