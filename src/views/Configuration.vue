<template>
    <div class="configuration">
        <div class="content">
            <label>
                Nom de cette configuration:
                <input
                    type="name"
                    v-model="tabName"
                >
            </label>
            <label
                :class="{ isWrong: errors.has('apiName') }"
            >
                API:
                <select v-model="apiName">
                    <option v-for="opt of apiOptions"
                        :key="opt.id"
                        :value="opt.id"
                    >
                        {{opt.label}}
                    </option>
                </select>
            </label>
            <label
                :class="{ isWrong: errors.has('apiMode') }"
            >
                API mode:
                <select v-model="apiMode">
                    <option v-for="opt of apiModeOptions"
                        :key="opt.id"
                        :value="opt.id"
                    >
                        {{opt.label}}
                    </option>
                </select>
            </label>
            <label v-if="tags.includes('token')"
                :class="{ isWrong: errors.has('token') }"
            >
                API token: <input v-model="token">
            </label>
            <label v-if="tags.includes('station')"
                :class="{ isWrong: errors.has('station') }"
            >
                Id de gare: <input v-model="stationId">
            </label>
            <label v-if="tags.includes('lat') || tags.includes('lng')"
                :class="{ isWrong: errors.has('lat') || errors.has('lng') }"
            >
                Lieu:
                <GeoMap v-model="latLng" />
            </label>
            <label v-if="tags.includes('distance')"
                :class="{ isWrong: errors.has('distance') }"
            >
                Distance à partir du lieu: <DistanceRange />
            </label>
            <label
                :class="{ isWrong: errors.has('refreshTime') }"
            >
                Temps de rafraichissement: <input type="number" min="1" v-model="refreshTime">s
            </label>
            <label
                :class="{ isWrong: errors.has('silentPeriods') }"
            >
                Périodes sans rafraichissement:
                    <Period v-for="(period, key) of silentPeriods"
                        :key="key"
                        :period="period"
                        @input="(period)=>updatePeriod(key, period)"
                        @delete="deletePeriod(key)"
                    />
                    <button @click="addPeriod">+</button>
            </label>
            <div>
                <button
                    :disabled="!isConfValid"
                    @click="update"
                >
                    Test
                </button>
                <button v-if="isValid"
                    @click="toHome"
                >
                    Voir les départs
                </button>
                <button v-else disabled>
                    Configuration invalide
                </button>
            </div>
            <div :class="fetchState">
                {{statusText}}
            </div>
            <button @click="remove">
                Supprimer cette configuration
            </button>
        </div>
    </div>
</template>

<script>

import { urlAPIs, getURL, getUrlTags, errors as apiErrors } from '@/helper.js';
import DistanceRange from '@/components/DistanceRange.vue';
import GeoMap from '@/components/Map.vue';
import Period from '@/components/Period.vue';

export default {
    name: 'configuration',
    computed: {
        tabName: {
            get: function() {
                return this.$store.state.name;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { name: value });
            },
        },
        token: {
            get: function() {
                return this.$store.state.token;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { token: value });
            },
        },
        stationId: {
            get: function() {
                return this.$store.state.station;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { station: value });
            },
        },
        latLng: {
            get: function() {
                return this.$store.state.lat + ';' + this.$store.state.lng;
            },
            set: function(value) {
                const [lat, lng] = value.split(';');
                this.$store.commit('setConfiguration', { lat, lng });
            },
        },
        refreshTime: {
            get: function() {
                return this.$store.state.refreshTime / 1000;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { refreshTime: value * 1000 });
            },
        },
        silentPeriods: {
            get: function() {
                return this.$store.state.silentPeriods.slice();
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { silentPeriods: value });
            },
        },
        apiName: {
            get: function() {
                return this.$store.state.apiName;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { apiName: value });
            },
        },
        apiMode: {
            get: function() {
                return this.$store.state.apiMode;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { apiMode: value });
            },
        },
        fetchState: function() {
            return this.$store.state.fetchState;
        },
        errors: function() {
            return apiErrors;
        },

        tags: function() {
            return getUrlTags(this.apiName, this.apiMode);
        },

        statusText: function() {
            const text = {
                'good': 'La configuration est bonne.',
                'bad': 'La configuration n\'est pas correcte !',
                'testing': 'Test de la configuration en cours...',
                'offline': 'Aucune connexion internet pour tester la ligne...',
            };

            return text[this.fetchState];
        },

        isConfValid: function() {
            //TODO reset url
            return !!getURL(this.$store, this.apiName, this.apiMode);
        },
        isValid: function() {
            return this.isConfValid && this.fetchState === 'good';
        },
        apiOptions: function() {
            return Object.keys(urlAPIs).map(key => ({
                id: key,
                label: key,
            }));
        },
        apiModeOptions: function() {
            return Object.keys(urlAPIs[this.apiName]).map(key => ({
                id: key,
                label: key,
            }));
        },
    },
    methods: {
        update() {
            this.$store.commit('setStatus', { fetchState: 'testing' });
            this.$store.dispatch('update');
        },
        toHome() {
            this.$router.push('home');
        },
        addPeriod() {
            const periods = this.silentPeriods;
            periods.push({
                from: {
                    hour: 0,
                    minute: 0,
                },
                to: {
                    hour: 23,
                    minute: 59,
                },
            });
            this.silentPeriods = periods;
        },
        updatePeriod(key, period) {
            const periods = this.silentPeriods;
            periods[key] = period;
            this.silentPeriods = periods;
        },
        deletePeriod(key) {
            const periods = this.silentPeriods;
            periods.splice(key, 1);
            this.silentPeriods = periods;
        },
        remove() {
            this.$store.dispatch('removeConfiguration', this.$store.state.activeConf);
        },
    },
    components: {
        DistanceRange, GeoMap, Period,
    },
};
</script>

<style scoped>
.configuration {
    padding-top: 1em;
}
label {
    display: block;
    margin-bottom: 1em;
}
input[type="number"] {
    width: 4em;
}
button {
    margin: 1em;
    padding: 5px;
}
.content {
    padding-left: 5em;
}
.isWrong {
    color: rgb(150, 30, 20);
}

.good {
    color: rgb(10, 100, 20);
}
.bad, .offline {
    color: rgb(100, 20, 10);
}
.testing {
    color: rgb(50, 70, 150);
}
</style>
