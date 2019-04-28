<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="home">Home</router-link> |
      <router-link to="configuration">Config</router-link> |
      <router-link to="about">About</router-link>
    </div>
  </div>
</template>

<style>
html {
    height: 100%;
    background-color: white;
}
body {
    height: 100%;
    margin: 0;
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
</style>
