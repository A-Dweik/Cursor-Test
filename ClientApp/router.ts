import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import CatDetails from './components/Cats/CatDetails';

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
            path: '/cat/:id',
            name: 'catDetails',
            component: CatDetails,
            props: true,
        },
    ],
});
