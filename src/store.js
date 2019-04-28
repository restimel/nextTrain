import Vue from 'vue';
import Vuex from 'vuex';
import { version } from '../package.json';

Vue.use(Vuex);

let timerRefresh = 0;

export default new Vuex.Store({
    state: {
        departures: [],
        context: {
            timezone: 'Europe/Paris',
            current_datetime: '',
        },
        token: '',
        station: '',
        refreshTime: 30000,
    },
    mutations: {
        setState(state, {departures, context}) {
            state.departures = departures;
            state.context = context;
        },
        setConfiguration(state, { token, station, refreshTime }) {
            if (token) {
                state.token = token;
            }
            if (station) {
                state.station = station;
            }
            refreshTime = +refreshTime;
            if (!isNaN(refreshTime) && refreshTime > 0) {
                state.refreshTime = refreshTime;
            }
        },
    },
    actions: {
        async update({ commit, dispatch, state }) {
            const {token, station} = state;

            if (token && station) {
                const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3AOCE%3ASA%3A87386417/departures`;
                const response = await fetch(url, {
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': 'Basic ' + btoa(token),
                    },
                });
                const json = await response.json();
                commit('setState', json);
                dispatch('nextUpdate');
            } else {
                console.info('we cannot fetch data without token and station id');
            }
        },
        nextUpdate({ dispatch, state }) {
            clearTimeout(timerRefresh);
            const period = state.refreshTime;

            timerRefresh = setTimeout(() => {
                dispatch('update');
            }, period);
        },
    },
});
