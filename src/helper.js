
export const urlAPIs = {
    sncf: {
        station: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3A%(station)s/departures',
        position: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/coord/%(lng)s%3B%(lat)s/departures?distance=%(distance)s',
    },
    stif: {
        position: 'https://opendata.stif.info/service/api-stif-horaires/coords/%(lng)s%3B%(lat)s/departures?count=%(nbItems)s&distance=%(distance)s&apikey=%(token)s',
    },
};

export let errors = new Set();

export function checkURL(state, url) {
    errors.clear();

    if (!url) {
        url = urlAPIs[state.apiName];
    }

    url.replace(/%\((\w+)\)s/g, (_, key) => {
        const val = state[key];
        if (val.toString() === '' || val === undefined || val === null) {
            errors.add(key);
        }
    });

    return !errors.size;
}

export function getURL({ state, commit }, name, mode) {
    let url = state.cacheUrl;

    if (url) {
        return url;
    }

    const api = urlAPIs[name];
    url = api && api[mode];

    if (!url || !checkURL(state, url)) {
        return '';
    }

    url = url.replace(/%\((\w+)\)s/g, (_, key) => {
        return encodeURIComponent(state[key]);
    });

    if (commit) {
        commit('setCacheUrl', url);
    }

    return url;
}
