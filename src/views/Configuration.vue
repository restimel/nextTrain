<template>
    <div class="configuration">
        <h1>Configuration</h1>
        <div class="content">
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
                :class="{ isWrong: errors.has('token') }"
            >
                API token: <input v-model="token">
            </label>
            <label
                :class="{ isWrong: errors.has('station') }"
            >
                Id de gare: <input v-model="stationId">
            </label>
            <label
                :class="{ isWrong: errors.has('distance') }"
            >
                Distance à partir du lieu: <input v-model="distance" type="range" min="1" max="10000"> {{distanceLabel}}
            </label>
            <label
                :class="{ isWrong: errors.has('refreshTime') }"
            >
                Temps de rafraichissement: <input type="number" min="1" v-model="refreshTime">s
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
                    Home
                </button>
                <button v-else disabled>
                    Configuration invalide
                </button>
            </div>
            <div :class="fetchState">
                {{statusText}}
            </div>
        </div>
    </div>
</template>

<script>

import { urlAPIs, getURL, errors as apiErrors } from '@/helper.js';

export default {
    name: 'configuration',
    data: function() {
        return {};
    },
    computed: {
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
        distance: {
            get: function() {
                return this.$store.state.distance;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { distance: value });
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
        apiName: {
            get: function() {
                return this.$store.state.apiName;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { apiName: value });
            },
        },
        fetchState: function() {
            return this.$store.state.fetchState;
        },
        errors: function() {
            return apiErrors;
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
            return !!getURL(this.$store, this.apiName);
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
        distanceLabel: function() {
            let distance = this.distance;
            if (distance < 1000) {
                return `${distance}m`;
            }
            distance = Math.round(distance / 100) / 10;
            return `${distance}km`;
        },
    },
    methods: {
        update: function() {
            this.$store.commit('setStatus', { fetchState: 'testing' });
            this.$store.dispatch('update');
        },
        toHome: function() {
            this.$router.push('home');
        },
    },
};
</script>

<style scoped>
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
    color: rgb(100, 20, 10);
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
