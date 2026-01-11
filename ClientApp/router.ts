import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import CarsList from './components/Cars/CarsList';
import RentalsList from './components/Rentals/RentalsList';
Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index,
        },
        {
            path: '/cars',
            name: 'cars',
            component: CarsList,
        },
        {
            path: '/rentals',
            name: 'rentals',
            component: RentalsList,
        },
    ],
});
