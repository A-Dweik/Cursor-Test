import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import Cars from './components/Cars/Cars';
import Rentals from './components/Rentals/Rentals';

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
            path: '/cars',
            name: 'cars',
            component: Cars,
        },
        {
            path: '/rentals',
            name: 'rentals',
            component: Rentals,
        },
    ],
});
