import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

import Home from '@/pages/Home.vue';
import Profile from '@/pages/Profile.vue';

const routes = [
    {
        path: '/',
        component: Home
    }, {
        name: 'profile',
        path: '/profile',
        component: Profile,
        props: (route) => ({
            ...route.params
        })
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;