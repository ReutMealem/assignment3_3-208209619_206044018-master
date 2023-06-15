<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.recipe_id">
        <RecipePreview class="recipePreview" :recipe="r" :viewed="recipeInViewed(r.recipe_id)"/>
        <!-- <RecipePreview v-else="recipeInViewed" class="recipePreview" :recipe="r" /> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: [],
      viewedRecipes: []
    };
  },
  mounted() {
    this.updateRecipes();
    this.getViewed();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/generalRandomRecipes",
        );
        const recipes = response.data.recipes;
        this.recipes.push(...recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    async getViewed(){
      try {
        console.log( this.$root.store.server_domain + "/users/userViewedRecipes");
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/userViewedRecipes",
        );
        const viewedRecipesNotFiltered = response.data.recipes;
        const viewedRecipes = viewedRecipesNotFiltered.filter(recipe => recipe.recipe_type === "API");
        this.viewedRecipes.push(...viewedRecipes);

      } catch (error) {
        console.log(error);
      }
    },
    recipeInViewed(recipe_id) {
      if(recipe_id in this.viewedRecipes){
        return true;
      }
      else{
        return false;
      }
    },
  }

};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
