<template>
  <div id="app">

    <navbar></navbar>
    <router-view id="router-view" style="min-height: 900px"></router-view>
    <footer style="background-color: transparent; color: white"> @lireRecipes </footer>
  </div>
</template>

<script>

import navbar from './components/navbar';

export default {
  name: "App",
  components: {navbar: navbar},
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image:  url('./assets/recipe_background.jpg');
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
