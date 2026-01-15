import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import DogList from './components/Dogs/DogList';
import DogDetails from './components/Dogs/DogDetails';
import AdoptionForm from './components/Dogs/AdoptionForm';
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
            path: '/dogs',
            name: 'dogs',
            component: DogList,
        },
        {
            path: '/dogs/:id',
            name: 'dog-details',
            component: DogDetails,
        },
        {
            path: '/adopt/:id',
            name: 'adoption-form',
            component: AdoptionForm,
        },
    ],
});
