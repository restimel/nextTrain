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
        this.$store.dispatch('update');
        return {};
    },
    computed: {
        departures: function() {
            return this.$store.state.departures.slice(0, 10);
        },
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
