import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Configuration from './views/Configuration.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
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
            component: Configuration,
        },
        {
            path: '*',
            name: 'Default',
            redirect: 'home',
        },
    ],
});
