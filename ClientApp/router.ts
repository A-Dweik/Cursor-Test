import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import PetList from './components/Pets/PetList';

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
            path: '/pets',
            name: 'pets',
            component: PetList,
        },
    ],
});
