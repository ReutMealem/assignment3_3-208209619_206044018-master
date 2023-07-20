<template>
  <div class="main_page">
  <div class="row justify-content-center">
      <div class="col-md-6">
        
        <b> Random Recipes </b>
        <div v-if="!$root.store.username">
        <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :check_viewed="false" :new_recipe="this.new_random" > </RecipePreviewList>
        </div>
        <div v-else>
          <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :new_recipe="this.new_random"></RecipePreviewList>
        </div>
        <b-button @click="loadNewRandomRecipes">New Recipes</b-button>
  
      </div >

      <div class="col-md-6">
        
        <div v-if="!$root.store.username">
          <loginComp></loginComp>
        </div>
        
        <div v-else>
          <b>Last Viewed Recipes</b>
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
  async loadNewRandomRecipes() {
    this.new_random=true;
    window.location.reload();
    this.new_random=false;
  }
}
  
};
</script>

<style lang="scss" scoped>
.main_page{

}
</style>
