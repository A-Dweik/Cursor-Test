import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import IPhoneDetails from './components/iPhone/IPhoneDetails';

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
            path: '/iphone/:id',
            name: 'iphone-details',
            component: IPhoneDetails,
            props: true,
        },
    ],
});
