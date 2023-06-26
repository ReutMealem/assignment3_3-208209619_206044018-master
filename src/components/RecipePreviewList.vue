<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-row v-for="(r, index) in recipes" :key="`${r.recipe_id}-${index}`">
        
          <RecipePreview v-if=check_viewed class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id)"/>
          <RecipePreview v-else class="recipePreview" :recipe="r" :viewed="false"/>
       
      </b-row>
    </b-row>
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
    check_viewed: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false
    },
    path: {
      type: String,
      required: true
    },
    new_recipe: {
      type: Boolean,
      required: false,
      default: true
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
    this.getViewed();
  },
  methods: {
    async updateRecipes() {
      try {
        this.noResults = false;
        const response = await this.axios.get(
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
          if (this.new_recipe){
            const recipes = response.data.recipes;
            console.log("hereeeeeeeeeeeeee", recipes);
            this.recipes = [];
            this.recipes.push(...recipes);
          }

        }
        if(this.recipes.length == 0){
          this.noResults = true;
        }

      } catch (error) {
        console.log(error);
      }
    },

    async getViewed(){
      if (!this.check_viewed){
        return;
      }
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/userViewedRecipes",
        );
        const viewedRecipesNotFiltered = response.data.recipes;
        // viewed only for API recipes (needs to be one recipes number 2)
        const viewedRecipes_type_id = viewedRecipesNotFiltered.filter(recipe => recipe.recipe_type === "API");
        const id_recipes_list = viewedRecipes_type_id.map(recipe=> recipe.recipe_id); 
        this.viewedRecipes = [];
        this.viewedRecipes.push(...id_recipes_list);
    
      } catch (error) {
        console.log(error);
      }
    },
    recipeInViewed(recipe_id) {
      return this.viewedRecipes.includes(recipe_id);
    },
  },
  

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
