<template>
    <div class="home">
        <Train v-for="departure of departures"
            :key="departure.display_informations.headsign"
            :departure="departure"
        />
    </div>
</template>

<script>
import Train from '@/components/Train.vue';

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
        Train,
    },
};
</script>

<style scoped>
.home {
    display: grid;
    grid-template: repeat(10, 1fr) / 100%;
}
</style>
