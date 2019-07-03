<template>
    <span>
        <span class="mainElement" @click="show = true; initialize()">
            {{value}}
        </span>
        <button v-if="addButton"
            class="edit-button"
            @click="show = true; initialize()"
        >
            {{addButton}}
        </button>
        <dialog v-if="show"
            class="map"
        >
            <header>Position</header>
            <LMap
                style="height: 100%; width: 100%"
                :zoom="zoom"
                :center="mapCenter"
                ref="map"
                @click="setCenter"
            >
                <LTileLayer :url="url"></LTileLayer>
                <LCircle
                    :lat-lng="center"
                    :radius="radius"
                    color="red"
                />
            </LMap>
            <aside>lat: {{lat}} lng: {{lng}}</aside>
            <aside>
                <label>
                    Distance: <DistanceRange />
                </label>
            </aside>
            <footer>
                <span>{{message}}</span>
                <button @click="getPosition">Ma position actuelle</button>
                <button @click.prevent.stop="show = false">Close</button>
            </footer>
        </dialog>
    </span>
</template>

<script>

import 'leaflet/dist/leaflet.css';
import DistanceRange from '@/components/DistanceRange.vue';
import {LMap, LTileLayer, LCircle} from 'vue2-leaflet';
import L from 'leaflet';

export default {
    name: 'geomap',
    props: {
        value: String,
        addButton: String,
    },
    data () {
        this.$nextTick(this.initialize);
        return {
            show: false,
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            zoom: this.value ? 16 : 5,
            mapCenter: [46.34432063334355, 2.605306736102118],
            message: '',
        };
    },
    computed: {
        lat: function() {
            if (!this.value) {
                return 0;
            }
            return +this.value.split(';')[0];
        },
        lng: function() {
            if (!this.value) {
                return 0;
            }
            return +this.value.split(';')[1];
        },
        center: function() {
            return [this.lat, this.lng];
        },
        radius: function() {
            return this.$store.state.distance;
        },
    },
    methods: {
        initialize() {
            if (this.value) {
                this.mapCenter = this.center.slice();
                this.$nextTick(() => {
                    const radius = this.radius;
                    if (this.$refs.map && radius) {
                        const point = L.latLng(this.mapCenter);
                        this.$refs.map.fitBounds(point.toBounds(radius));
                    }
                });
            }
        },
        getPosition() {
            this.message = 'Géolocalisation en cours...';
            navigator.geolocation.getCurrentPosition(
                evt => {
                    this.message = '';
                    const {latitude: lat, longitude: lng} = evt.coords;
                    this.$emit('input', `${lat};${lng}`);
                    this.mapCenter = [lat, lng];
                    const accuracy = evt.coords.accuracy;
                    const point = L.latLng(lat, lng);
                    this.$refs.map.fitBounds(point.toBounds(accuracy));
                    console.log('accuracy', evt.coords.accuracy);
                },
                this.manageError,
                {
                    enableHighAccuracy: true,
                }
            );
        },
        manageError(evt) {
            switch (evt.code) {
                case evt.PERMISSION_DENIED:
                    this.message = 'Vous avez refusé la géolocalisation.';
                    break;
                case evt.POSITION_UNAVAILABLE:
                    this.message = 'La géolocalisation n\'a pas pu être réalisée.';
                    break;
                case evt.TIMEOUT:
                    this.message = 'La géolocalisation a mis trop de temps.';
                    break;
                default:
                    this.message = evt.message;
            }
        },
        setCenter(evt) {
            const {lat, lng} = evt.latlng;
            this.$emit('input', [lat, lng].join(';'));
        },
    },
    components: {
        DistanceRange,
        LMap, LTileLayer, LCircle,
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
</style>
