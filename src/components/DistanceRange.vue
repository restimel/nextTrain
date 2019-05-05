<template>
    <span>
        <input
            v-model="distance"
            type="range"
            min="1"
            max="50"
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
                return this.convertIn(this.$store.state.distance);
            },
            set: function(value) {
                this.$store.commit('setConfiguration', { distance: this.convertOut(value) });
            },
        },
        distanceLabel: function() {
            let distance = this.convertOut(this.distance);
            if (distance < 1000) {
                return `${distance}m`;
            }
            distance = Math.round(distance / 100) / 10;
            return `${distance}km`;
        },
    },
    methods: {
        convertIn(value) {
            const d = Math.floor(Math.log10(value));
            const u = Math.floor(value/(10**d)) - 1;
            const result = d * 10 + u;
            return parseInt(result.toString(), 9);
        },
        convertOut(value) {
            value = +value.toString(9);
            const d = Math.floor(value / 10);
            const u = value % 10 + 1;
            const result =(10 ** d) * u;
            return result;
        },
    },
};
</script>

<style scoped>
</style>
