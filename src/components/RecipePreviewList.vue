<template>
  <b-container>
    <h3>
      <slot></slot>
    </h3>
    <!-- Column to hold the recipe previews --> 
    <b-col >
      <b-row v-for="(r, index) in recipes" :key="`${r.recipe_id}-${index}`">
        <!-- Pass recipe details to the RecipePreview component --> 
        <RecipePreview  class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id, r.type)" :favorite="isRecipeInFavorites(r.recipe_id)" :type="r.type"/>
      </b-row>
    </b-col>
    <!-- Display message if no recipes are available --> 
    <p v-if="noResults">No Recipes</p>
  </b-container>
</template>

<script>
import { type } from 'os';
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    // Boolean prop to check if viewed recipe
    check_viewed: {
      type: Boolean,
      required: false,
      default: true
    },
    // API path for fetching recipes
    path: {
      type: String,
      required: true
    },
    // Type of recipes (e.g., API, personal, family)
    page_type: {
      type: String,
      required: true
      },
    // Boolean prop to determine if new recipes should be fetched
    new_recipe: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      recipes: [], // Array to store fetched recipes
      viewedRecipes: [], // Array to store viewed recipes
      noResults: false, // Boolean flag to indicate if no recipes are available
      favoritesRecipes: [], // Array to store favorite recipes
    };
  },
  created(){
    // Fetch favorite recipes and viewed recipes, and update the list of recipes
    this.getFavorites();
    this.getViewed();
    this.updateRecipes();
  }, 
  methods: {
    async updateRecipes() {
      try {
        // Method to fetch and update the list of recipes 
        this.noResults = false;
        const response = await this.axios.get(this.$root.store.server_domain + this.path);
        if(response.data.recipes.length === 0){
         this.noResults = true;
        }
        
        else{
          if (this.path === "/users/userFavoriteRecipes") {
            // If fetching favorite recipes, combine API, personal, and family recipes into one list 
            const recipes_API = response.data.recipes.API.map(recipe => ({ ...recipe, type: 'API' }));
            const recipes_personal = response.data.recipes.personal.map(recipe => ({ ...recipe, type: 'personal' }));
            const recipes_family = response.data.recipes.family.map(recipe => ({ ...recipe, type: 'family' }));
            this.recipes = [...recipes_API, ...recipes_personal, ...recipes_family]; 
          } 
          else {
            // If fetching other recipes, append recipes of the specific type 
            const recipes = response.data.recipes.map(recipe => ({ ...recipe, type: this.page_type }));
            if (this.new_recipe) {
              this.recipes = [];
              this.recipes.push(...recipes);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Method to fetch and update the list of viewed recipes 
    async getViewed(){
      if (!this.check_viewed){
        return;
      }
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/userViewedRecipes",
        );
        // Filter viewed recipes to consider only API recipes (needs to be one recipe with recipe_type "API") 
        const viewedRecipesNotFiltered = response.data.recipes;
        const viewedRecipes_type_id = viewedRecipesNotFiltered.filter(recipe => recipe.recipe_type === "API");
        const id_recipes_list = viewedRecipes_type_id.map(recipe=> recipe.recipe_id); 
        this.viewedRecipes = [];
        this.viewedRecipes.push(...id_recipes_list);
    
      } catch (error) {
        console.log(error);
      }
    },
    // Method to check if a recipe is viewed based on its ID and type 
    recipeInViewed(recipe_id, recipe_type) {
      if (recipe_type == "API"){
        return this.viewedRecipes.includes(recipe_id);
        }
      else{
        return true; // If the recipe is not an API recipe, consider it as viewed
      }
    },
    // Method to fetch and update the list of favorite recipes
    async getFavorites(){
      if(!this.$root.store.username ){
        return;
      }
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/userFavoriteRecipesByIdType"
        );
        this.favoritesRecipes = response.data.recipes;
    },
    // Method to check if a recipe is in favorites based on its ID and type 
   isRecipeInFavorites(id) {
    if (this.page_type === 'favorite'){
      return true;
    }
    else{
      const foundRecipe = this.favoritesRecipes.find((recipe) => recipe.recipe_id === id && recipe.recipe_type === this.page_type);

      if (foundRecipe === undefined) {
        return false;
      } else {
        return true;
      }
    }
   }
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}

</style>