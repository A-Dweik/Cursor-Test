import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import CarList from './components/CarList/CarList';
import CarDetails from './components/CarDetails/CarDetails';
import AddCar from './components/AddCar/AddCar';

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
            component: CarList,
        },
        {
            path: '/car/:id',
            name: 'carDetails',
            component: CarDetails,
        },
        {
            path: '/add-car',
            name: 'addCar',
            component: AddCar,
        },
    ],
});
