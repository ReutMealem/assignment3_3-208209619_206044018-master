<template>
<ul class= "nav nav-pills">
    <router-link :to="{ name: 'main' }" tag="a" active-class="active" class="nav-link" exact>Vue Recipes</router-link>|
    <router-link :to="{ name: 'search' }" tag="a" active-class="active" class="nav-link" exact>Search</router-link>|
      {{ !$root.store.username }}
      <b v-if="!$root.store.username">
        Guest:
        <router-link :to="{ name: 'register' }" tag="a" active-class="active" class="nav-link" exact>Register</router-link>|
        <router-link :to="{ name: 'login' }" tag="a" active-class="active" class="nav-link" exact>Login</router-link>|
      </b>
      <b v-else>
        {{ $root.store.username }}: <button @click="Logout">Logout</button>|
      </b>
</ul>

</template>

<script>
export default {
    name: "navbar"
};
</script>

<style>

</style>