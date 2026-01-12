import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import LandList from './components/Lands/LandList';
import LandForm from './components/Lands/LandForm';
import LandDetails from './components/Lands/LandDetails';
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
            name: 'landList',
            component: LandList,
        },
        {
            path: '/lands/new',
            name: 'landForm',
            component: LandForm,
        },
        {
            path: '/lands/edit/:id',
            name: 'landForm',
            component: LandForm,
        },
        {
            path: '/lands/:id',
            name: 'landDetails',
            component: LandDetails,
        },
    ],
});
