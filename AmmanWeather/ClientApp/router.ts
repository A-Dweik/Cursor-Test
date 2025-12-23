import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import Weather from './components/Weather/Weather';
Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Weather,
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather,
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
        },
    ],
});
