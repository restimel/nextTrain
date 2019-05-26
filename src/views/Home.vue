<template>
    <div class="home">
        <Train v-for="(departure, idx) of departures"
            :key="departure.route.id + departure.stop_date_time.departure_date_time + idx"
            :departure="departure"
        />
        <div v-if="departures.length === 0"
            class="banner-information"
        >
            Aucune ligne n'a été récupérée avec la configuration donnée.
            <router-link to="configuration">Voir la configuration</router-link>
        </div>
        <div v-if="modeText"
            class="notification"
            @click="update"
        >
            {{modeText}}
        </div>
        <Clock class="clock" />
    </div>
</template>

<script>
import Train from '@/components/Train.vue';
import Clock from '@/components/Clock.vue';
import { checkSilentPeriod } from '@/helper.js';

export default {
    name: 'home',
    props: {
        id: {
            type: Number,
            required: false,
        },
    },
    data: function() {
        setTimeout(() => {
            this.checkIndex();
        }, 0);
        this.checkState();
        this.checkMode();

        return {
            currentIndex: this.id || this.$route.params.id,
            mode: 'normal',
        };
    },
    computed: {
        departures: function() {
            return this.$store.state.departures.slice(0, 10);
        },
        fetchState: function() {
            this.checkMode();
            return this.$store.state.fetchState;
        },
        modeText() {
            switch (this.mode) {
                case 'silent': return 'Silent mode: Aucun rafraichissement n\'est effectué automatiquement';
                default: return '';
            }
        },
    },
    methods: {
        update: function() {
            this.$store.dispatch('update');
        },
        goto: function(url) {
            this.$router.push(url);
        },
        checkIndex: function() {
            const idx = this.currentIndex;

            if (typeof idx !== 'undefined' && idx !== this.$store.state.activeConf) {
                this.$store.commit('changePageActive', idx);
                this.$store.dispatch('update');
            }
        },
        checkState: function() {
            if (this.fetchState === 'bad') {
                this.goto('configuration');
            }
        },
        checkMode: function() {
            const isSilent = checkSilentPeriod(this.$store.state);
            this.mode = isSilent ? 'silent' : 'normal';
        },
    },
    watch: {
        fetchState: function() {
            this.checkState();
        },
        id() {
            this.currentIndex = this.id;
        },
        '$route.params.id': function() {
            this.currentIndex = this.$route.params.id;
        },
        currentIndex() {
            this.checkIndex();
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
.notification {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 3vh;
    padding: 1rem;
    background-color: rgba(160, 160, 160, 0.4);
    box-shadow: 0 5px 15px 0 black;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    cursor: pointer;
}
</style>
