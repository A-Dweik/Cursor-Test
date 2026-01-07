import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import ContractsList from './components/Contracts/ContractsList';
import ContractForm from './components/Contracts/ContractForm';
import ContractView from './components/Contracts/ContractView';
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
            component: ContractsList,
        },
        {
            path: '/contracts/add',
            name: 'contract-add',
            component: ContractForm,
        },
        {
            path: '/contracts/:id/edit',
            name: 'contract-edit',
            component: ContractForm,
        },
        {
            path: '/contracts/:id',
            name: 'contract-view',
            component: ContractView,
        },
    ],
});
