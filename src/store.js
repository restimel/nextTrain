import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let timerRefresh = 0;

export default new Vuex.Store({
    state: {
        departures: [],
        context: {
            timezone: 'Europe/Paris',
            current_datetime: '',
        },
        fetchState: 'good',
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
        setStatus(state, { fetchState }) {
            if (fetchState) {
                state.fetchState = fetchState;
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
                if (!response.ok) {
                    console.warn('Dat failed to be fetched');
                    commit('setStatus', {
                        fetchState: 'bad',
                    });
                    return;
                }
                const json = await response.json();
                commit('setState', json);
                commit('setStatus', {
                    fetchState: 'good',
                });
                dispatch('nextUpdate');
            } else {
                console.info('we cannot fetch data without token and station id');
                commit('setStatus', {
                    fetchState: 'bad',
                });
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
