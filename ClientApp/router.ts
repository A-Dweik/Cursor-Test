import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index/Index';
import Doctors from './components/Doctors/Doctors';
import LabTests from './components/LabTests/LabTests';
import Appointments from './components/Appointments/Appointments';
import MyAppointments from './components/MyAppointments/MyAppointments';

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
            path: '/doctors',
            name: 'doctors',
            component: Doctors,
        },
        {
            path: '/lab-tests',
            name: 'labTests',
            component: LabTests,
        },
        {
            path: '/appointments',
            name: 'appointments',
            component: Appointments,
        },
        {
            path: '/my-appointments',
            name: 'myAppointments',
            component: MyAppointments,
        },
    ],
});
