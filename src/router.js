import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Configurations from './views/Configurations.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*/home/:id',
            name: 'homeWithId',
            component: Home,
        },
        {
            path: '*/home',
            name: 'home',
            component: Home,
            alias: '*/',
        },
        {
            path: '*/about',
            name: 'about',
            component: About,
        },
        {
            path: '*/configuration',
            name: 'configuration',
            component: Configurations,
        },
        {
            path: '*',
            name: 'Default',
            redirect: 'home',
        },
    ],
});
