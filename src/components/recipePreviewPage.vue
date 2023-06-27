<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_name }}</h1>

        <b v-if="$root.store.username">
          <img :src="require('@/assets/heart.png')" class="center small-image" v-if="isfavorite" />
          <div>
            <button @click="addToFavorites()" v-if="!isfavorite">
                Add To Favorites
            </button>
        </div>
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

  </div>
</template>

<script>
export default {
  data() {
    return {
      favoritesRecipes: [],
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isfavorite: {
      type: Boolean,
      required: true
    }
  },
  
  methods: {
    async addToFavorites() {
      console.log("add to favorites clicked");
      if (!(this.isfavorite)) {
        console.log("Recipe is not in favorites and will add it now:");
        try {
          const response = await this.axios.put(
            `${this.$root.store.server_domain}/users/userFavoriteRecipes/${this.recipe.recipe_id}/${this.type}`
          );
          this.onUpdateRecipe();
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
      else{
        console.log("recipe is already in favorites!");
      }
    },

    async onUpdateRecipe() {
      this.RefreshPage();
      this.$root.toast("Save", "Recipes add to favorite successfully", "success");

    },

    async RefreshPage() {
    this.new_random=true;
    window.location.reload();
    this.new_random=false;
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