<template>
    <div class="home">
        <Train v-for="departure of departures"
            :key="departure.display_informations.headsign"
            :departure="departure"
        />
        <div v-if="departures.length === 0"
            class="banner-information"
        >
            Aucune ligne n'a été récupérées avec la configuration donnée.
            <router-link to="configuration">Voir la configuration</router-link>
        </div>
        <Clock class="clock" />
    </div>
</template>

<script>
import Train from '@/components/Train.vue';
import Clock from '@/components/Clock.vue';

export default {
    name: 'home',
    data: function() {
        this.checkState();
        return {};
    },
    computed: {
        departures: function() {
            return this.$store.state.departures.slice(0, 10);
        },
        fetchState: function() {
            return this.$store.state.fetchState;
        },
    },
    methods: {
        update: function() {
            this.$store.dispatch('update');
        },
        goto: function(url) {
            this.$router.push(url);
        },
        checkState: function() {
            if (this.fetchState === 'bad') {
                this.goto('configuration');
            }
        },
    },
    watch: {
        fetchState: function() {
            this.checkState();
        },
    },
    mount() {
        this.update();
    },
    components: {
        Train, Clock,
    },
};
</script>

<style scoped>
.home {
    display: grid;
    grid-template: repeat(10, 1fr) / 100%;
}
.clock {
    position: absolute;
    top: 1vw;
    right: 1vw;
}

.banner-information {
    position: absolute;
    z-index: 5;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3vh;
    padding: 1rem;
    background-color: rgba(160, 160, 255, 0.6);
    box-shadow: 0 5px 15px 2px black;
}
</style>
