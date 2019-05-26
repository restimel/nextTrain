<template>
    <div class="configuration">
        <h1>Configuration</h1>
        <div class="tabs">
            <div v-for="(tab, idx) of tabs"
                class="tab"
                :class="{active: idx === activeTab}"
                @click="activeTab = idx"
                :key="'tab-' + idx"
            >
                {{tab}}
            </div>
            <div class="tab tab__add-configuration" @click="add" title="Créer une nouvelle configuration">
                +
            </div>
        </div>
        <Configuration />
    </div>
</template>

<script>

import Configuration from '@/views/Configuration.vue';

export default {
    name: 'configurations',
    computed: {
        activeTab: {
            get() {
                return this.$store.state.activeConf;
            },
            set(idx) {
                if (idx !== this.activeTab) {
                    this.$store.commit('changePageActive', idx);
                }
            },
        },
        tabs() {
            const confs = this.$store.state.configurations;
            return confs.map((conf, idx) => conf.name || `configuration #${idx + 1}`);
        },
    },
    methods: {
        add() {
            this.$store.dispatch('createNewConfiguration');
        },
    },
    components: {
        Configuration,
    },
};
</script>

<style scoped>
    .tabs {
        width: 100%;
        display: flex;
        border-bottom: 1px solid black;
    }

    .tab {
        padding: 0.5rem;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border: 1px solid black;
        border-bottom: none;
        box-shadow: 0 -5px 5px black;
        background-color: rgba(220, 220, 220, 0.5);
        cursor: pointer;
    }
    .tab:not(.active):hover {
        font-weight: bold;
    }
    .tab.active {
        background-color: rgba(220, 200, 150, 0.8);
        color: orange;
        border-color: orange;
        box-shadow: 0 -5px 5px orange;
        cursor: default;
    }
    .tab__add-configuration {
        color: white;
        background-color: rgba(50, 50, 50, 0.8);
    }
</style>
