<template>

    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Logo</b-navbar-brand>
      <router-link :to="{ name: 'main' }" tag="b-navbar-brand" active-class="active" class="nav-link" exact>Home</router-link>
      <router-link :to="{ name: 'search' }" tag="b-navbar-brand" active-class="active" class="nav-link" exact >Search</router-link>
      <router-link :to="{ name: 'about' }" tag="b-navbar-brand" active-class="active" class="nav-link" exact>About</router-link>
        

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown v-if="$root.store.username" :disabled="false" text="Private" right>
            <b-dropdown-item href="#">Favorites Recipes</b-dropdown-item>
            <b-dropdown-item href="#">Personal Recipes</b-dropdown-item>
            <b-dropdown-item href="#">Family Recipes</b-dropdown-item>
            </b-nav-item-dropdown>

        </b-navbar-nav>

        <b v-if="!$root.store.username">
        Hello Guest
        <router-link :to="{ name: 'register' }" tag="b-navbar-brand" active-class="active" class="nav-link" exact>Register</router-link>
        <router-link :to="{ name: 'login' }" tag="b-navbar-brand" active-class="active" class="nav-link" exact>Login</router-link>
      </b>
      <b v-else>
        <b-navbar-nav class="ml-auto">
          
            <b-nav-item-dropdown right>
       
            <template #button-content>
                <em>User</em>
            </template>

            <b-dropdown-item @click="Logout">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
        
        </b-navbar-nav>
      </b>

        </b-collapse>
    </b-navbar>
    </div>


</template>

<script>
export default {
    name: "navbar",
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

<style>

</style>