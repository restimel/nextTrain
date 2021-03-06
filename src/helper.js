
export const urlAPIs = {
    sncf: {
        station: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3A%(station)s/departures',
        position: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/coord/%(lng)s%3B%(lat)s/departures?distance=%(distance)s',
        routeStopPoints: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/routes/%(route)s/stop_points?count=100',
        routeArrivals: 'https://%(token)s@api.sncf.com/v1/coverage/sncf/routes/%(route)s/arrivals?count=100',
    },
    stif: {
        station: 'https://opendata.stif.info/service/api-stif-horaires/stop_areas/stop_area%3A%(station)s/departures&apikey=%(token)s',
        position: 'https://opendata.stif.info/service/api-stif-horaires/coords/%(lng)s%3B%(lat)s/departures?count=%(nbItems)s&distance=%(distance)s&apikey=%(token)s',
        routeStopPoints: 'https://opendata.stif.info/service/api-stif-horaires/routes/%(route)s/stop_points?count=100&apikey=%(token)s',
        routeArrivals: 'https://opendata.stif.info/service/api-stif-horaires/routes/%(route)s/arrivals?count=100&apikey=%(token)s',
    },
};

export let errors = new Set();

export function compareDate(date1, date2) {
    return date1.hour < date2.hour || (date1.hour === date2.hour && date1.minute < date2.minute);
}

export function checkSilentPeriod({getters, state}) {
    if (state.dialogOpen) {
        return true;
    }

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const currentDate = {
        hour, minute,
    };
    const periods = getters.silentPeriods;

    return periods.some(period => compareDate(period.from, currentDate) && compareDate(currentDate, period.to));
}

export function checkURL(state, url) {
    errors.clear();

    if (!url) {
        url = urlAPIs[state.apiName];
    }

    url.replace(/%\((\w+)\)s/g, (_, key) => {
        const val = state[key];
        if (!val || val.toString() === '' || val === undefined || val === null) {
            errors.add(key);
        }
    });

    return !errors.size;
}

export function getUrlTags(name, mode = 'position'){
    const api = urlAPIs[name];
    const url = api && api[mode];
    const rgx = /%\(([^)]+)\)s/g;
    const list = url.match(rgx);
    return list.map(tag => tag.replace(rgx, '$1'));
}

export function getURL({ state, commit }, name, mode = 'position', extendState = {}) {
    let url = state && state.cacheUrl;

    if (url) {
        return url;
    }

    const api = urlAPIs[name];
    url = api && api[mode];

    const values = Object.assign({}, state, extendState);

    if (!url || !checkURL(values, url)) {
        console.warn('wrong url', url, Array.from(errors).join('/'));
        return '';
    }

    url = url.replace(/%\((\w+)\)s/g, (_, key) => {
        return encodeURIComponent(values[key]);
    });

    if (commit && !extendState) {
        commit('setCacheUrl', url);
    }

    return url;
}
