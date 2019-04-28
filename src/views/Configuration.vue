<template>
    <div class="configuration">
        <h1>Configuration</h1>
        <div class="content">
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
        fetchState: function() {
            return this.$store.state.fetchState;
        },

        statusText: function() {
            const text = {
                'good': 'La configuration est bonne.',
                'bad': 'La configuration n\'est pas correcte !',
                'testing': 'Test de la configuration en cours...',
            };

            return text[this.fetchState];
        },

        isConfValid: function() {
            const state = this.token && this.stationId && this.refreshTime > 0;
            return !!state;
        },
        isValid: function() {
            return this.isConfValid && this.fetchState === 'good';
        },
    },
    methods: {
        update: function() {
            this.$store.commit('setStatus', { fetchState: 'testing' });
            this.$store.dispatch('update');
        },
        toHome: function() {
            this.$router.push('/');
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
.bad {
    color: rgb(100, 20, 10);
}
.testing {
    color: rgb(50, 70, 150);
}
</style>
