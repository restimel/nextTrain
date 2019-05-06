<template>
    <div>
        de
        <input
            v-model="fromTime"
            type="time"
        />
        à
        <input
            v-model="toTime"
            type="time"
        />
        <button @click="$emit('delete')" class="delete">×</button>
    </div>
</template>

<script>

export default {
    name: 'Period',
    props: {
        period: Object,
    },
    computed: {
        fromTime: {
            get: function() {
                return this.buildHour(this.period.from);
            },
            set: function(value) {
                if (value) {
                    const [h, m] = value.split(':').map(v => +v);
                    this.period.from = {
                        hour: h,
                        minute: m,
                    };
                    this.$emit('input', this.period);
                }
            },
        },
        toTime: {
            get: function() {
                return this.buildHour(this.period.to);
            },
            set: function(value) {
                if (value) {
                    const [h, m] = value.split(':').map(v => +v);
                    this.period.to = {
                        hour: h,
                        minute: m,
                    };
                    this.$emit('input', this.period);
                }
            },
        },
    },
    methods: {
        buildHour(p) {
            let hour = p.hour;
            let min = p.minute;
            if (hour < 10){
                hour = `0${hour}`;
            }
            if (min < 10){
                min = `0${min}`;
            }
            return `${hour}:${min}`;
        },
    },
};
</script>

<style scoped>
.delete {
    margin-left: 2rem;
}
</style>
