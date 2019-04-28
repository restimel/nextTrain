<template>
    <div class="clock" @click="update">
        {{time}}
    </div>
</template>

<script>

export default {
    name: 'clock',
    data: function() {
        setTimeout(this.updateTime.bind(this), 0);
        return {
            minutes: 0,
            hours: 0,
            timer: 0,
        };
    },
    computed: {
        time: function() {
            return `${this.pad(this.hours)}:${this.pad(this.minutes)}`;
        },
    },
    methods: {
        updateTime: function() {
            clearTimeout(this.timer);
            const d = new Date();
            this.hours = d.getHours();
            this.minutes = d.getMinutes();
            this.timer = setTimeout(this.updateTime.bind(this), 10000);
        },
        update: function() {
            this.$store.dispatch('update');
        },
        pad: function(nb) {
            if (nb >= 10) {
                return nb;
            }
            return `0${nb}`;
        },
    },
    deleted: function() {
        clearTimeout(this.timer);
    },
};
</script>

<style scoped>
.clock {
    display: inline-block;
    padding: 0.5rem;
    background-color: black;
    color: yellow;
    box-shadow: 0 0.5rem 2rem rgb(100, 100, 100);
    border-radius: 0.5em;
    font-size: 1vw;
}
</style>
