<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

      <b-button
        size="lg"
        variant="primary"
        class="mb-2 sticky-button-home"
        @click="goHome()"
        v-if="$route.name !== 'Home'"
      >
        <b-icon icon="house-fill" variant="light"></b-icon>
      </b-button>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    isHome() {
      this.$route.name === "Home";
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.sticky-button-home {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 50px;
  height: 50px;
  padding: 6px 0px;
  border-radius: 25px;
  text-align: center;
  font-size: 24px;
  line-height: 1.42857;
  z-index: 2;
}
</style>
