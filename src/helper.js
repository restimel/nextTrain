
export const urlAPIs = {
    sncf: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%(station)s/departures',
    stif: 'https://opendata.stif.info/service/api-stif-horaires/coords/%(lng)s%3B%(lat)s/departures?count=%(nbItems)s&distance=%(distance)s&apikey=%(token)s',
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

export function getURL({ state, commit }, name) {
    let url = state.cacheUrl;

    if (url) {
        return url;
    }

    url = urlAPIs[name];

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
