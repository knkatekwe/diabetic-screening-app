import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import Tables from '@/pages/Patients/Basic'
import Notifications from '@/pages/Notifications/Notifications'
import Charts from '@/pages/Charts/Charts'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            redirect: 'login',
            name: 'Layout',
            component: Layout,
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                // patients
                {
                    path: 'patients',
                    name: 'Tables',
                    component: Tables
                },
                {
                    path: 'patients/add-new',
                    name: 'Tables',
                    component: Tables
                },
                {
                    path: 'patients/add-vitals',
                    name: 'Tables',
                    component: Tables
                },
                {
                    path: 'patients/display-vitals',
                    name: 'Tables',
                    component: Tables
                },
                // notifications
                {
                    path: 'notifications',
                    name: 'Notifications',
                    component: Notifications
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                },
            ],
        },
        {
            path: '*',
            name: 'Error',
            component: Error
        }
    ],
});
