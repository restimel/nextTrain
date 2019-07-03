<template>
    <span>
        <button v-if="show"
            @click="showDialog = true; initialize()"
        >
            {{buttonName}}
        </button>
        <dialog v-if="showDialog"
            class="map"
        >
            <header>{{routeName}}</header>
            <LMap
                style="height: 100%; width: 100%"
                :zoom="4"
                :center="mapCenter"
                ref="map"
            >
                <LTileLayer :url="mapUrl"></LTileLayer>
                <l-marker v-if="!stopPoints"
                    :lat-lng="[42, 1]"
                    :icon="markerSelectedIcon"
                ></l-marker>
                <l-marker v-for="[key, point] of stopPoints"
                    :lat-lng="[point.lat, point.lng]"
                    :icon="key === stopName ? markerSelectedIcon : markerIcon"
                    @click="selectStop(point)"
                    :key="key"
                />
            </LMap>
            <aside>
                <label>
                    Arret: {{stopName}}
                </label>
                <!-- <label>
                    départ: {{hourDeparture}}
                </label>
                <label>
                    Arrivée: {{hourArrival}}
                </label> -->
            </aside>
            <footer>
                <span class="message">{{message}}</span>
                <button @click.prevent.stop="showDialog = false">Close</button>
            </footer>
        </dialog>
    </span>
</template>

<script>

import 'leaflet/dist/leaflet.css';
import {LMap, LTileLayer, LMarker, LPolyline} from 'vue2-leaflet';
import L from 'leaflet';
import {getURL} from '@/helper';

export default {
    name: 'geomapRoute',
    props: {
        departure: Object,
        buttonName: String,
        show: Boolean,
    },
    data () {
        this.$nextTick(this.start.bind(this));
        return {
            showDialog: false,
            mapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            message: '',
            stopName: '',
            hourDeparture: '',
            hourArrival: '',
            stopPoints: new Map(),
            mapCenter: [46.34432063334355, 2.605306736102118],
        };
    },
    computed: {
        routeId() {
            return this.departure.route.id;
        },
        routeName() {
            return this.departure.route.name;
        },
        departureId() {
            return this.departure.stop_point.label;
        },
        markerIcon() {
            return new L.icon({
                iconUrl: 'data:image/svg+xml;utf-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 32 32" xml:space="preserve"><style>circle{stroke:#3b85b9;cursor:pointer}svg:hover circle{stroke:#ff8100}</style><circle cx="16" cy="16" r="15" fill="#2b82cb"/><circle cx="16" cy="16" r="5" fill="white"/></svg>',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                // popupAnchor: [-3, -76],
                // shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
                // shadowSize: [25, 41],
                // shadowAnchor: [22, 94],
            });
        },
        markerSelectedIcon() {
            return new L.icon({
                iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                // popupAnchor: [-3, -76],
                shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
                shadowSize: [25, 41],
                shadowAnchor: [12, 41],
            });
        },
    },
    methods: {
        start() {
            this.stopName = this.departureId;
            this.hourDeparture = this.formatTime(this.departure.stop_date_time.departure_date_time);
            this.hourArrival = this.formatTime(this.departure.stop_date_time.arrival_date_time);
        },
        async initialize() {
            const url = getURL(this.$store, 'sncf', 'routeStopPoints', {route: this.routeId});
            if (!url) {
                this.message = 'Wrong url: cannot fetch route.';
                return;
            }
            try {
                const result = await this.$store.dispatch('fetch', url);
                if (!result.ok) {
                    throw new Error('Data failed to be fetched');
                }
                const json = await result.json();
                this.parseStopPointResult(json);

                const urlArrivals = getURL(this.$store, 'sncf', 'routeArrivals', {route: this.routeId});
                if (!urlArrivals) {
                    this.message = 'Wrong url: cannot fetch arrivals.';
                    return;
                }
                const resultArrivals = await this.$store.dispatch('fetch', urlArrivals);
                if (!resultArrivals.ok) {
                    throw new Error('Arrivals data failed to be fetched');
                }
                this.parseArrivals(await resultArrivals.json());
                this.message = '';
            } catch(e) {
                this.message = e.message;
            }
        },
        parseTime(time = '') {
            return time.split('T')[1];
        },
        formatTime(time = '') {
            if (time.includes('T')) {
                time = this.parseTime(time)
            }
            if (!time) {
                return '---';
            }
            const [_, h, m, s] = time.match(/(\d\d)(\d\d)(\d\d)/);
            return `${h}:${m}`;
        },
        parseStopPointResult(result) {
            if (result.error) {
                this.message = result.error.message;
                return;
            }

            const stopPoints = result.stop_points.map((point) => [point.label, {
                name: point.label,
                lat: +point.coord.lat,
                lng: +point.coord.lon,
                departures: [],
                arrivals: [],
                departure: '',
                arrival: '',
                linkNext: null,
                linkPrevious: null,
                isTerminal: false,
            }]);

            this.stopPoints = new Map(stopPoints);

            const latLngs = stopPoints.map(([k, point]) => [point.lat, point.lng]);
            const bounds = L.latLngBounds(latLngs);
            this.mapCenter = bounds.getCenter();

            this.$refs.map.fitBounds(bounds, { animate: true, duration: 0.5 });
        },
        parseArrivals(result) {
            const stopPoints = this.stopPoints;
            console.log(result)
            result.arrivals.forEach((point) => {
                const key = point.stop_point.label;
                const departure = this.parseTime(point.stop_date_time.departure_date_time);
                const arrival = this.parseTime(point.stop_date_time.arrival_date_time);
                const pt = stopPoints.get(key);
                pt.departures.push(departure);
                pt.arrivals.push(arrival);
            });

            const list = Array.from(stopPoints.values());
                console.log('step0', list)

            function estimate(point) {
                return +point.departure[0] || 0;
            }
            list.sort((a, b) => estimate(a) - estimate(b));
            console.log('step1')
            const departureId = this.departureId;
            const currentIdx = list.findIndex((point) => point.name === departureId);
            const lngth = list.length - 1;
            const departureHour = this.parseTime(this.departure.stop_date_time.departure_date_time);
            const arrivalHour = this.parseTime(this.departure.stop_date_time.arrival_date_time);
           console.log('step2')
            function buildLink(point, idx) {
                if (idx === 0) {
                    point.isTerminal = true;
                } else {
                    point.linkPrevious = list[idx - 1];
                }
                if (idx === lngth) {
                    point.isTerminal = true;
                } else {
                    point.linkNext = list[idx + 1];
                }
            }
            let depH = departureHour;
            let arrH = arrivalHour;
            const curPt = list[currentIdx];
            buildLink(curPt, currentIdx);
            curPt.departure = departureHour;
            curPt.arrival = arrivalHour;
            console.log('step3', currentIdx)

            for (let idx = currentIdx - 1; idx >= 0; idx--) {
                const point = list[idx];
                buildLink(point, idx);
                console.log('dec', point.departures, depH)
                depH = point.departures.reduce((d, h) => h <= depH ? h > d ? h : d : d + '0', '');
                arrH = point.arrivals.reduce((d, h) => h <= arrH ? h > d ? h : d : d, '');
                point.departure = depH;
                point.arrival = arrH;
            }
            for (let idx = currentIdx + 1; idx <= lngth; idx++) {
                const point = list[idx];
                buildLink(point, idx);
                console.log('cres', point.departures, depH)
                depH = point.departures.reduce((d, h) => h >= depH ? h < d ? h : d : d, 'T');
                arrH = point.arrivals.reduce((d, h) => h >= arrH ? h < d ? h : d : d, 'T');
                point.departure = depH;
                point.arrival = arrH;
            }
            console.log('step4')
        },
        selectStop(point) {
            this.stopName = point.name;
            this.hourDeparture = this.formatTime(point.departure);
            this.hourArrival = this.formatTime(point.arrival);
        },
    },
    watch: {
        showDialog() {
            this.$store.commit('openDialog', this.showDialog);
        },
    },
    components: {
        LMap, LTileLayer, LMarker, LPolyline,
    },
};
</script>

<style scoped>
.edit-button {
    margin-left: 1em;
}
.mainElement {
    cursor: pointer;
}
.message{
    font-size: 0.8em;
    color: red;
    font-style: italic;
}
.map {
    top: 5%;
    width: 75%;
    height: 85%;
    padding: 5px 2rem;
    display: grid;
    grid-template: 3vh 1fr 3vh 4vh 3vh / 100%;
    background: rgba(200, 200, 250, 0.5);
    box-shadow: 0 5px 25px 1px black;
    background: white;
    font-size: 2vh;
    z-index: 1000;
}
/* .map > * {
    align-items: center;
} */
header {
    text-align: center;
}
footer {
    text-align: right;
}
footer > button {
    margin-left: 1rem;
}
label {
    display: block;
}
</style>
