<template>
  <div class="container">
    <!-- Include the recipePreviewPage component and pass necessary props -->
    <recipePreviewPage :recipe="recipe" :type="type" :isfavorite="isfavorite"></recipePreviewPage>
  </div>
</template>

<script>
import recipePreviewPage from "../components/recipePreviewPage";
export default {
  components: { recipePreviewPage: recipePreviewPage },
  data() {
    return {
      // Data to hold the recipe, type, and favorite status 
      recipe: {},
      type: "",
      isfavorite: true,
    };
  },

  created() {
    // Fetch data from route query parameters and initialize component data
    this.isfavorite = Boolean(this.$route.query.favor);
    this.recipe = JSON.parse(this.$route.query.recipe);
    this.type = this.$route.query.type;

    // Call the method to add the recipe to the user's viewed list
    this.addToView();

    // this.recipe = this.$route.params.recipe;
    // this.type = this.$route.params.type;
    // this.isfavorite = this.$route.params.favor;
    // this.getFavorites();
  },
  methods: {
    // Method to add the recipe to the user's viewed list (if logged in)
    async addToView() {
      if (this.$root.store.username) {
        console.log("add to viewed list");
        try {
          // Make a PUT request to the server to add the recipe to the user's viewed list
          const response = await this.axios.put(
            `${this.$root.store.server_domain}/users/userViewedRecipes/${this.recipe.recipe_id}/${this.type}`
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
<style>
</style>