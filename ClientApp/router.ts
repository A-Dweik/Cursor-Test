import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import TransactionVerification from './components/TransactionVerification/TransactionVerification';
import TransactionLog from './components/TransactionLog/TransactionLog';

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
            path: '/verify',
            name: 'verify',
            component: TransactionVerification,
        },
        {
            path: '/logs',
            name: 'logs',
            component: TransactionLog,
        },
    ],
});
