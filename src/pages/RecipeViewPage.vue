<template>
  <div class="container">
    <recipePreviewPage :recipe="recipe" :type="type" :isfavorite="isfavorite"></recipePreviewPage>
  </div>
</template>

<script>
import recipePreviewPage from "../components/recipePreviewPage";
export default {
 
  components: {recipePreviewPage: recipePreviewPage},
  data() {
    return {
      recipe: {},
      type: "",
      isfavorite: true,
    
    };
  },
  
  created() {
    this.isfavorite = Boolean(this.$route.query.favor);
    this.recipe = JSON.parse(this.$route.query.recipe);
    this.type = this.$route.query.type;
    this.addToView();


    // this.recipe = this.$route.params.recipe;
    // this.type = this.$route.params.type;
    // this.isfavorite = this.$route.params.favor;
    // this.getFavorites();
  },
  methods: {
      async addToView() {
      console.log("add to viewed list");
        try {
          const response = await this.axios.put(
            `${this.$root.store.server_domain}/users/userViewedRecipes/${this.recipe.recipe_id}/${this.type}`
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

    }
  };
</script>
<style>

</style>
