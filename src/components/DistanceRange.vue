<template>
    <span>
        <input
            v-model="distance"
            type="range"
            min="1"
            max="10000"
        />
        {{distanceLabel}}
    </span>
</template>

<script>

export default {
    name: 'distanceRange',
    props: {
        departure: Object,
    },
    computed: {
        distance: {
            get: function() {
                return this.$store.state.distance;
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { distance: value });
            },
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
};
</script>

<style scoped>
</style>
