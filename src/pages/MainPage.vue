<template>
  <div class="main_page">

    <!-- Main page layout with two columns -->
    <div class="row justify-content-center">

      <!-- Left column for Random Recipes section -->
      <div class="col-md-6">

        <!-- Title for the Random Recipes section -->
        <div class="design"><b>Random Recipes</b></div>

        <!-- Display RecipePreviewList for random recipes if user is not logged in -->
        <div v-if="!$root.store.username">
        <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :check_viewed="false" :new_recipe="this.new_random" > </RecipePreviewList>
        </div>

        <!-- Display RecipePreviewList for random recipes if user is logged in -->
        <div v-else>
          <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :new_recipe="this.new_random"></RecipePreviewList>
        </div>

        <!-- Button to load new random recipes -->
        <div >
          <b-button class="button-center" @click="loadNewRandomRecipes">New Recipes</b-button>
        </div>
  
      </div >

      <!-- Right column for Last Viewed Recipes section -->
      <div class="col-md-6">

        <!-- Display login component if user is not logged in -->
        <div v-if="!$root.store.username">
          <loginComp class="mt-5"></loginComp>
        </div>

        <!-- Display Last Viewed Recipes if user is logged in -->
        <div v-else>
          <div class="design"><b>Last Viewed Recipes</b></div>
          <RecipePreviewList page_type="API" path ="/users/userLastViewedRecipes" >
          </RecipePreviewList> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginComp from "../components/login";

import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList, 
    loginComp
  },
  data() {
    return {new_random: true};
  },
  methods: {
    // Method to load new random recipes
    async loadNewRandomRecipes() {
      this.new_random=true;
      window.location.reload();
      this.new_random=false;
    }
}
  
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');

.design{
  text-align: center;
  font-family: 'Concert One', serif;
  font-size: 30px;
  font-weight: 400;
  color:black;
}
.main_page{
  font-family: 'Concert One', serif;
  font-size: 20px;
  font-weight: 400;
  color:black;
}
.button-center{
  padding: 8px;
  border-radius: 10px;
  font-family: 'Concert One', serif;
  font-size:16px;
  font-weight: 400;
  color:#000000;
  background-color: rgba(255, 255, 255, 0.8);
  width: 20rem;
}
.button-center{
  margin-left: 230px;
}
.button-center:hover {
  color: black;
  background-color:  rgb(245, 230, 220);
}
</style>
