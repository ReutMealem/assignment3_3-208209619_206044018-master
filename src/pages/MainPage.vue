<template>
  <div class="container">
    <div class="left">
      <b> Random Recipes </b>
      <div v-if="!$root.store.username">

      <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :check_viewed="false" :new_recipe="this.new_random" > </RecipePreviewList>
      </div>
      <div v-else>
        <RecipePreviewList page_type="API" class="RandomRecipes center" path ="/recipes/generalRandomRecipes" :new_recipe="this.new_random"></RecipePreviewList>
      </div>
      <b-button @click="loadNewRandomRecipes">New Recipes</b-button>
 
      </div >
    <div class="right">
      
      <div v-if="!$root.store.username"> <loginComp></loginComp></div>
      
      <div v-else>
        <b>Last Viewed Recipes</b>

        <RecipePreviewList page_type="API" path ="/users/userLastViewedRecipes" >
        </RecipePreviewList> 
      </div>
    </div>
 
    <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      
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
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}

.container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.right{
  grid-column: 2/span 1;
  display: flex;
  flex-direction: column;
}
 .left{
  grid-column: 1/span 1;
 }
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
