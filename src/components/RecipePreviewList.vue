<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="(r, index) in recipes" :key="`${r.recipe_id}-${index}`">
        <!-- <RecipePreview  class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id)"/> -->
        <RecipePreview  class="recipePreview" :recipe="r" :viewed="false"/>
      </b-col>
    </b-row>
    <p v-if="noResults">No Recipes</p>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      viewedRecipes: [],
      noResults: false
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        this.noResults = false;
        const response = await this.axios.get(
          // this.$root.store.server_domain + "/recipes/generalRandomRecipes",
          this.$root.store.server_domain + this.path,
        );
        console.log(this.path);
        if(this.path==="/users/userFavoriteRecipes"){
          // TO DO: fix the output of the response: { recipes: [ { API: [Array], personal: [Array], family: [Array] } ] } to be one big array of recipes.
          const recipes_API = response.data.recipes[0].API;
          const recipes_personal = response.data.recipes[0].personal;
          const recipes_family = response.data.recipes[0].family;

          this.recipes = [];
          this.recipes.push(...recipes_API);
          this.recipes.push(...recipes_personal);
          this.recipes.push(...recipes_family);
        }
        else{
          const recipes = response.data.recipes;
          this.recipes = [];
          this.recipes.push(...recipes);
        }
        if(this.recipes.length == 0){
          this.noResults = true;
        }
        else{
          if(this.$root.store.username){ // checks if user logged in to call getViewed
            console.log("user logged: " ,this.$root.store.username);
            this.getViewed();
            console.log("viewed recipes: ",this.viewedRecipes);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getViewed(){
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/userViewedRecipes",
        );
        const viewedRecipesNotFiltered = response.data.recipes;
        // viewed only for API recipes (needs to be empty for now (add in DB))
        const viewedRecipes = viewedRecipesNotFiltered.filter(recipe => recipe.recipe_type === "API");
        this.viewedRecipes = [];
        this.viewedRecipes.push(...viewedRecipes);
      } catch (error) {
        console.log(error);
      }
    },
    recipeInViewed(recipe_id) {
      return this.viewedRecipes.some(recipe => recipe.recipe_id === recipe_id);
    },
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
