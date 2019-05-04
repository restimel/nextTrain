<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="home">Home</router-link> |
      <router-link to="configuration">Config</router-link> |
      <router-link to="about">About</router-link>
    </div>
    <div v-if="showBanner"
        id="information-banner"
    >
        {{bannerText}}
    </div>
  </div>
</template>

<script>

export default {
    name: 'App',
    computed: {
        isOnLine: function() {
            return this.$store.state.onLine;
        },
        showBanner: function() {
            return !this.isOnLine;
        },
        bannerText: function() {
            if (!this.isOnLine) {
                return 'Offline mode: no internet connection';
            }
            return '';
        },
    },
};

</script>

<style>
html {
    height: 100%;
    background-color: white;
}
body {
    height: 100%;
    margin: 0;
    overflow: hidden;
}
#app {
    padding: 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    display: grid;
    grid-template: 1fr 30px / 100%;
}
#nav {
   text-align: center;
    padding: 5px;
    font-size: 0.7em;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#information-banner {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5vh;
    padding: 2rem;
    background-color: rgba(200, 200, 200, 0.5);
    box-shadow: 0 5px 15px 2px black;
}
</style>
