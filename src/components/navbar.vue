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
            <router-link :to="{ name: 'favorites' }" tag="b-dropdown-item" active-class="active" class="nav-link" exact >Favorites Recipes</router-link>
            <router-link :to="{ name: 'personal' }" tag="b-dropdown-item" active-class="active" class="nav-link" exact >Personal Recipes</router-link>
            <router-link :to="{ name: 'family' }" tag="b-dropdown-item" active-class="active" class="nav-link" exact >Family Recipes</router-link>
            </b-nav-item-dropdown>

        </b-navbar-nav>
        

        <b-navbar-nav>

            <b-nav-item-dropdown v-if="$root.store.username" :disabled="false" text="Create New Recipe" right>
            <b-dropdown-item v-b-modal.modal-1 id="modal-1"  @click="showPersonalModal">Create Personal Recipe</b-dropdown-item>
              <CreatePersonalRecipe v-if="createPersonalRecipeClicked"></CreatePersonalRecipe>
            <b-dropdown-item v-b-modal.modal-2 id="modal-2"  @click="showFamilyModal">Create Family Recipe</b-dropdown-item>
              <CreateFamilyRecipe v-if="createFamilyRecipeClicked"></CreateFamilyRecipe>
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
                <em>{{$root.store.username}}</em>
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
import CreatePersonalRecipe from '@/pages/CreatePersonalRecipe';
import CreateFamilyRecipe from '@/pages/CreateFamilyRecipe';

export default {
    name: "navbar",
    components: {
      CreatePersonalRecipe,
      CreateFamilyRecipe,
    },
    data() {
      return {
        createPersonalRecipeClicked: false,
        createFamilyRecipeClicked: false,

        };
    },
    mounted() {
      this.createPersonalRecipeClicked = false;
      this.createFamilyRecipeClicked = false;

    },
    methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showPersonalModal(){
      console.log("createPersonalRecipeClicked")
      this.createPersonalRecipeClicked = true;
    },
    showFamilyModal(){
      console.log("createFamilyRecipeClicked")
      this.createFamilyRecipeClicked = true;
    }
  }
};

</script>

<style>

</style>