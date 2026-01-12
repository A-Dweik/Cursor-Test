import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import LandList from './components/LandList/LandList';
import LandForm from './components/LandForm/LandForm';
import LandDetails from './components/LandDetails/LandDetails';

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
            path: '/lands',
            name: 'lands',
            component: LandList,
        },
        {
            path: '/lands/new',
            name: 'land-new',
            component: LandForm,
        },
        {
            path: '/lands/:id/edit',
            name: 'land-edit',
            component: LandForm,
        },
        {
            path: '/lands/:id',
            name: 'land-details',
            component: LandDetails,
        },
    ],
});
