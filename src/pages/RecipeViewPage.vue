<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_name }}</h1>
        <b v-if="$root.store.username">
          <img :src="require('@/assets/heart.png')" class="center small-image" v-if="isRecipeInFavorites(recipe.recipe_id)" />
        </b>

        <img :src="recipe.image_recipe" class="center" />

      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.prepare_time }} minutes</div>
              <div>Likes: {{ recipe.likes }} likes</div>
              <div>Portions: {{ recipe.portions }}</div>
              <div v-if="recipe.is_vegan">Vegan</div>
              <div v-if="recipe.is_veget">Vegetarian</div>
              <div v-if="recipe.is_glutenFree">GlutenFree</div>
              <div v-if="recipe.recipe_owner">
                Recipe Owner: {{ recipe.recipe_owner }}
              </div>
              <div v-if="recipe.when_prepared">
                When Prepared: {{ recipe.when_prepared }}
              </div>
            </div>
            Ingredients:
            <!-- Check if recipe has ingredients before rendering -->
            <ul v-if="recipe.recipe_ingredient.length">
              <li
                v-for="(i, index) in recipe.recipe_ingredient"
                :key="index + '_' + i.name"
              >
                {{ i.name }} {{ i.amount }} {{ i.unitLong }}
              </li>
            </ul>
            <p v-else>No ingredients available</p>
          </div>
          <div class="wrapped">
            Instructions:
            <!-- Check if recipe has instructions and steps before rendering -->
            <ol
              v-if="
                recipe.recipe_instruction[0] &&
                recipe.recipe_instruction[0].steps.length
              "
            >
              <li v-for="s in recipe.recipe_instruction[0].steps" :key="s">
                {{ s }}
              </li>
            </ol>
            <p v-else>No instructions available</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="addToFavorites()" v-if="!isRecipeInFavorites(recipe.recipe_id)">
        Add To Favorites
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      type: "",
      favoritesRecipes: [],
    };
  },
  created() {
    this.recipe = this.$route.params.recipe;
    this.type = this.$route.params.type;
    this.getFavorites();
  },
  methods: {
    async addToFavorites() {
      console.log("add to favorites clicked");
      if (!(this.isRecipeInFavorites(this.recipe.recipe_id))) {
        console.log("Recipe is not in favorites and will add it now:");
        try {
          const response = await this.axios.put(
            `${this.$root.store.server_domain}/users/userFavoriteRecipes/${this.recipe.recipe_id}/${this.type}`
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      else{
        console.log("recipe is already in favorites!");
      }
    },

    async getFavorites(){
      if(!this.$root.store.username ){
        return;
      }
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/userFavoriteRecipes"
        );
        const recipes_API = response.data.recipes.API;
        const recipes_personal = response.data.recipes.personal;
        const recipes_family = response.data.recipes.family;
        this.favoritesRecipes = [...recipes_API, ...recipes_personal, ...recipes_family];
      
    },

   isRecipeInFavorites(id) {
      const foundRecipe = this.favoritesRecipes.find((recipe) => recipe.recipe_id === id);

      if (foundRecipe === undefined) {
        console.log("Recipe is NOT in favorites -> false");
        return false;
      } else {
        console.log("Recipe is in favorites- > true");
        return true;
      }
    }

  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.small-image {
  width: 50px; 
  height: 50px; 
}
</style>
