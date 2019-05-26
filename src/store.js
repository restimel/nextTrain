import Vue from 'vue';
import Vuex from 'vuex';

import { getURL, checkSilentPeriod } from '@/helper.js';

Vue.use(Vuex);

let timerRefresh = 0;

function initConf() {
    return {
        name: '',
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

        cacheUrl: '',
    };
}

function setOneConfiguration(state, { name, token, station, distance, lat, lng, refreshTime, apiName, apiMode, silentPeriods, nbItems }, index) {
    let conf = state.configurations[index];

    if (!conf) {
        state.configurations[index] = initConf();
        conf = state.configurations[index];
    }

    if (typeof name === 'string') {
        conf.name = name;
    }

    if (typeof token === 'string') {
        conf.token = token;
    }
    if (typeof station === 'string') {
        conf.station = station;
    }

    if (typeof distance !== 'undefined') {
        distance = +distance;
        if (!isNaN(distance) && distance > 0) {
            conf.distance = distance;
        } else {
            conf.distance = 200;
        }
    }

    if (!isNaN(lat) && !isNaN(lng)) {
        conf.lat = +lat;
        conf.lng = +lng;
    } else if (lat !== undefined || lng !== undefined) {
        conf.lat = 0;
        conf.lng = 0;
    }

    if (typeof refreshTime !== 'undefined') {
        refreshTime = +refreshTime;
        if (!isNaN(refreshTime) && refreshTime > 0) {
            conf.refreshTime = refreshTime;
        } else {
            conf.refreshTime = 30;
        }
    }

    if (silentPeriods instanceof Array) {
        conf.silentPeriods = silentPeriods.slice();
    }

    if (typeof nbItems !== 'undefined') {
        nbItems = +nbItems;
        if (!isNaN(nbItems) && nbItems > 0) {
            conf.nbItems = nbItems;
        } else {
            conf.nbItems = 10;
        }
    }

    if (typeof apiName === 'string') {
        conf.apiName = apiName;
    }
    if (typeof apiMode === 'string') {
        conf.apiMode = apiMode;
    }

    state.cacheUrl = '';
}

function copyStateConf(state) {
    const configuration = state.configurations[state.activeConf];
    if (!configuration) {
        console.warn('Error to read configuration. Index %d not found, maximum is %d', state.activeConf, state.configurations.length);
        return;
    }
    for (let [key, value] of Object.entries(configuration)) {
        state[key] = value;
    }
}

export default new Vuex.Store({
    state: Object.assign({
        departures: [],
        context: {
            timezone: 'Europe/Paris',
            current_datetime: '',
        },

        configurations: [initConf()],
        activeConf: 0,

        fetchState: 'good',
        onLine: true,
    }, initConf()),
    mutations: {
        setState(state, {departures, context}) {
            state.departures = departures;
            state.context = context;
        },
        setConfiguration(state, configurations, index) {
            if (Array.isArray(configurations)) {
                configurations.forEach((configuration, idx) => setOneConfiguration(state, configuration, idx));
            } else {
                if (typeof index === 'undefined') {
                    index = state.activeConf;
                }
                setOneConfiguration(state, configurations, index);
            }

            //apply change
            state.configurations= state.configurations.slice();
            copyStateConf(state);

            if (!state.configurations[state.activeConf]) {
                state.activeConf = 0;
            }

            const exception = ['cacheUrl'];
            const saveConf = state.configurations.map((conf) => {
                const obj = {};
                for (let [key, value] of Object.entries(conf)) {
                    if (exception.includes(key)) {
                        continue;
                    }
                    obj[key] = value;
                }

                return obj;
            });
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
            state.configurations[state.activeConf].cacheUrl = cacheUrl;
            state.cacheUrl = cacheUrl;
        },
        changePageActive(state, index) {
            if (!state.configurations[+index] || state.activeConf === index) {
                return;
            }
            state.activeConf = +index;
            copyStateConf(state);
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
        createNewConfiguration({commit, state}) {
            const confs = state.configurations;
            confs.push(initConf());
            commit('setConfiguration', confs);
            commit('changePageActive', confs.length -1);
        },
        removeConfiguration({commit, dispatch, state}, index) {
            const confs = state.configurations;
            let idx = state.activeConf;

            confs.splice(index, 1);
            commit('setConfiguration', confs);
            if (index === idx) {
                if (idx !== 0) {
                    idx--;
                }
                commit('changePageActive', idx);
            }
            if (confs.length === 0) {
                dispatch('createNewConfiguration');
            }
        },
    },
});
