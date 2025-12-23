import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import LeaveRequest from './components/LeaveRequest/LeaveRequest';
import LeaveRequestList from './components/LeaveRequest/LeaveRequestList';
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
            path: '/leave-requests',
            name: 'leave-requests',
            component: LeaveRequestList,
        },
        {
            path: '/leave-request/new',
            name: 'new-leave-request',
            component: LeaveRequest,
        },
    ],
});
