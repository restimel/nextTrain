import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

function initializeStore() {
    let config = JSON.parse(localStorage.nextTrainConfig || '[]');

    if (!Array.isArray(config)) {
        config = [config];
    }

    document.location.search.slice(1).split('&').forEach(attribute => {
        const [key, value] = attribute.split('=');
        config[0][key] = decodeURIComponent(value);
    });
    store.commit('setConfiguration', config);
    store.dispatch('initialize');
}
initializeStore();
