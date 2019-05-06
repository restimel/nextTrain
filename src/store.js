import Vue from 'vue';
import Vuex from 'vuex';

import { getURL, checkSilentPeriod } from '@/helper.js';

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
        silentPeriods: [],

        refreshTime: 30000,
        nbItems: 10,
        apiName: 'sncf',
        apiMode: 'position',

        fetchState: 'good',
        onLine: true,
        cacheUrl: '',
    },
    mutations: {
        setState(state, {departures, context}) {
            state.departures = departures;
            state.context = context;
        },
        setConfiguration(state, { token, station, distance, lat, lng, refreshTime, apiName, apiMode, silentPeriods, nbItems }) {
            if (typeof token === 'string') {
                state.token = token;
            }
            if (typeof station === 'string') {
                state.station = station;
            }

            if (typeof distance !== 'undefined') {
                distance = +distance;
                if (!isNaN(distance) && distance > 0) {
                    state.distance = distance;
                } else {
                    state.distance = 200;
                }
            }

            if (!isNaN(lat) && !isNaN(lng)) {
                state.lat = +lat;
                state.lng = +lng;
            } else if (lat !== undefined || lng !== undefined) {
                state.lat = 0;
                state.lng = 0;
            }

            if (typeof refreshTime !== 'undefined') {
                refreshTime = +refreshTime;
                if (!isNaN(refreshTime) && refreshTime > 0) {
                    state.refreshTime = refreshTime;
                } else {
                    state.refreshTime = 30;
                }
            }

            if (silentPeriods instanceof Array) {
                state.silentPeriods = silentPeriods.slice();
            }

            if (typeof nbItems !== 'undefined') {
                nbItems = +nbItems;
                if (!isNaN(nbItems) && nbItems > 0) {
                    state.nbItems = nbItems;
                } else {
                    state.nbItems = 10;
                }
            }

            if (typeof apiName === 'string') {
                state.apiName = apiName;
            }
            if (typeof apiMode === 'string') {
                state.apiMode = apiMode;
            }
            state.cacheUrl = '';

            const saveConf = {
                token: state.token,
                station: state.station,
                distance: state.distance,
                lat: state.lat,
                lng: state.lng,
                refreshTime: state.refreshTime,
                silentPeriods: state.silentPeriods,
                nbItems: state.nbItems,
                apiName: state.apiName,
                apiMode: state.apiMode,
            };
            localStorage.nextTrainConfig = JSON.stringify(saveConf);
        },
        setStatus(state, { fetchState, onLine }) {
            if (fetchState) {
                state.fetchState = fetchState;
            }
            if (typeof onLine === 'boolean') {
                state.onLine = onLine;
            }
        },
        setCacheUrl(state, cacheUrl) {
            state.cacheUrl = cacheUrl;
        },
    },
    actions: {
        initialize({commit, dispatch}) {
            commit('setStatus', {onLine: navigator.onLine});
            if (navigator.connection) {
                navigator.connection.onchange = () => {
                    commit('setStatus', { onLine: navigator.onLine });
                };
            }
            dispatch('update');
        },
        async update({ commit, dispatch, state }) {
            if (!state.onLine) {
                commit('setStatus', {
                    fetchState: 'offline',
                });
                dispatch('nextUpdate');
                return;
            }

            let url = getURL({state, commit}, state.apiName, state.apiMode);
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
                }).catch((err) => {
                    console.warn('Error in request:', err.message);
                    return {ok: false};
                });
                if (!response.ok) {
                    console.warn('Data failed to be fetched');
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
                if (checkSilentPeriod(state)) {
                    dispatch('nextUpdate');
                } else {
                    dispatch('update');
                }
            }, period);
        },
    },
});
