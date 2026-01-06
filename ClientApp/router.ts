import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import ContractList from './components/ContractList/ContractList';
import ContractForm from './components/ContractForm/ContractForm';
import ContractDetails from './components/ContractDetails/ContractDetails';

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
            path: '/contracts',
            name: 'contracts',
            component: ContractList,
        },
        {
            path: '/contracts/new',
            name: 'contract-new',
            component: ContractForm,
        },
        {
            path: '/contracts/edit/:id',
            name: 'contract-edit',
            component: ContractForm,
        },
        {
            path: '/contracts/:id',
            name: 'contract-details',
            component: ContractDetails,
        },
    ],
});
