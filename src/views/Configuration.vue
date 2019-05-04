<template>
    <div class="configuration">
        <h1>Configuration</h1>
        <div class="content">
            <label>
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
            <label>
                API token: <input v-model="token">
            </label>
            <label>
                Id de gare: <input v-model="stationId">
            </label>
            <label>
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

import { urlAPIs, getURL } from '@/helper.js';

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
