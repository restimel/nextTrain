import Vue from 'vue';
import Vuex from 'vuex';

import { getURL } from '@/helper.js';

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
        distance: 200,
        lat: 48.937591000,
        lng: 2.15785800,

        refreshTime: 30000,
        nbItems: 10,
        apiName: 'sncf',

        fetchState: 'good',
        cacheUrl: '',
    },
    mutations: {
        setState(state, {departures, context}) {
            state.departures = departures;
            state.context = context;
        },
        setConfiguration(state, { token, station, distance, lat, lng, refreshTime, apiName, nbItems }) {
            if (token) {
                state.token = token;
            }
            if (station) {
                state.station = station;
            }

            distance = +distance;
            if (!isNaN(distance) && distance > 0) {
                state.distance = distance;
            }

            if (!isNaN(lat) && !isNaN(lng)) {
                state.lat = +lat;
                state.lng = +lng;
            }

            refreshTime = +refreshTime;
            if (!isNaN(refreshTime) && refreshTime > 0) {
                state.refreshTime = refreshTime;
            }

            nbItems = +nbItems;
            if (!isNaN(nbItems) && nbItems > 0) {
                state.nbItems = nbItems;
            }

            if (apiName) {
                state.apiName = apiName;
                state.cacheUrl = '';
            }

            const saveConf = {
                token: state.token,
                station: state.station,
                distance: state.distance,
                lat: state.lat,
                lng: state.lng,
                refreshTime: state.refreshTime,
                nbItems: state.nbItems,
                apiName: state.apiName,
            };
            localStorage.nextTrainConfig = JSON.stringify(saveConf);
        },
        setStatus(state, { fetchState }) {
            if (fetchState) {
                state.fetchState = fetchState;
            }
        },
        setCacheUrl(state, cacheUrl) {
            state.cacheUrl = cacheUrl;
        },
    },
    actions: {
        async update({ commit, dispatch, state }) {
            let url = getURL({state, commit}, state.apiName);
            if (url) {
                const headers = {
                    'Content-Type': 'text/plain',
                };
                if (url.includes('@')) {
                    let authorization;
                    url = url.replace(/(https?:\/\/)([^@]+)@/, (_, protocole, auth) => {
                        authorization = auth;
                        return protocole;
                    });
                    headers.Authorization = 'Basic ' + btoa(authorization);
                }

                const response = await fetch(url, {
                    credentials: 'same-origin',
                    headers: headers,
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
