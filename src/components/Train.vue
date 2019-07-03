<template>
    <div
        class="departure"
        :class="status"
        @mouseenter="showLineBtn=true"
        @mouseleave="showLineBtn=false"
    >
        <div :style="codeColor">{{line}}</div>
        <div>{{direction}}</div>
        <MapLine
            :show="showLineBtn"
            buttonName="i"
            :departure="departure"
        />
        <div>{{displayTime}}</div>
    </div>
</template>

<script>

import MapLine from '@/components/MapLine.vue';

export default {
    name: 'train',
    props: {
        departure: Object,
    },
    data() {
        return {
            showLineBtn: false,
        };
    },
    computed: {
        codeColor: function() {
            const color = this.departure.display_informations.color;
            return `color:#${color}`;
        },
        line: function() {
            const info = this.departure.display_informations;
            const mode = info.commercial_mode;
            const code = info.label;
            const headSign = info.headsign;
            if (mode.length + code.length > 12) {
                if (mode.length + headSign.length <= 12) {
                    return `${mode} ${headSign}`;
                }
                return mode;
            }
            return `${mode} ${code}`;
        },
        direction: function() {
            return this.departure.display_informations.direction;
        },
        time: function() {
            const timeStr = this.departure.stop_date_time.departure_date_time;
            const ddateTime = timeStr.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
            const ts = new Date(ddateTime);
            const elapsed = Math.floor((ts.getTime() - Date.now()) / 60000);

            return elapsed;
        },
        displayTime: function() {
            const time = this.time;
            let min = Math.abs(time) % 60;
            const hour = Math.floor(time / 60);
            if (hour) {
                if (min < 10) {
                    min = `0${min}`;
                }
                return `${hour} h ${min}`;
            }
            return `${min} min`;
        },
        status: function() {
            const time = this.time;
            if (time > 0) {
                return 'scheduled';
            }
            if (time === 0) {
                return 'coming';
            }
            return 'late';
        },
    },
    components: {
        MapLine,
    }
};
</script>

<style scoped>
.departure {
    display: grid;
    grid-template-columns: 15vw 1fr 2rem 10vw;
    align-items: center;
    font-size: 2vw;
    text-align: left;
}

.coming {
    background-color: rgba(245, 235, 170, 0.4);
    color: rgb(180, 180, 180);
}
.late {
    background-color: rgba(250, 150, 120, 0.4);
    color: rgb(90, 60, 50);
}
.scheduled:nth-child(2n+1) {
    background-color: rgba(200, 220, 220, 0.2);
}
</style>
