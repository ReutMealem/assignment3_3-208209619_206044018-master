<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="(r, index) in recipes" :key="`${r.recipe_id}-${index}`">
        <!-- <RecipePreview  class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id)"/> -->
        <RecipePreview  class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id, r.type)" :favorite="isRecipeInFavorites(r.recipe_id)" :type="r.type"/>
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
    },

    page_type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      viewedRecipes: [],
      noResults: false,
      favoritesRecipes: [],
    };
  },

  created(){
    this.getFavorites();
    this.getViewed();
    this.updateRecipes();
  },

  methods: {
    async updateRecipes() {
      try {
        this.noResults = false;

        const response = await this.axios.get(this.$root.store.server_domain + this.path);
        console.log(this.path);
        
        if (this.path === "/users/userFavoriteRecipes") {
          const recipes_API = response.data.recipes.API.map(recipe => ({ ...recipe, type: 'API' }));
          const recipes_personal = response.data.recipes.personal.map(recipe => ({ ...recipe, type: 'personal' }));
          const recipes_family = response.data.recipes.family.map(recipe => ({ ...recipe, type: 'family' }));
          this.recipes = [...recipes_API, ...recipes_personal, ...recipes_family]; 
        } else {
          const recipes = response.data.recipes.map(recipe => ({ ...recipe, type: this.page_type }));
          if (this.new_recipe) {
            this.recipes = [];
            this.recipes.push(...recipes);
          }
        }
        
        if (this.recipes.length === 0) {
          this.noResults = true;
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

    recipeInViewed(recipe_id, recipe_type) {
      if (recipe_type == "API"){
        return this.viewedRecipes.includes(recipe_id);
        }
      else{
        return true;
      }
    },

    async getFavorites(){
      if(!this.$root.store.username ){
        return;
      }
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/userFavoriteRecipesByIdType"
        );
        this.favoritesRecipes = response.data.recipes;
    },

   isRecipeInFavorites(id) {
    if (this.page_type === 'favorite'){
      return true;
    }
    else{
      const foundRecipe = this.favoritesRecipes.find((recipe) => recipe.recipe_id === id && recipe.recipe_type === this.page_type);

      if (foundRecipe === undefined) {
        console.log("Recipe is NOT in favorites -> false");
        return false;
      } else {
        console.log("Recipe is in favorites- > true");
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
