<template>
  <div class="container">
    <!-- Check if a recipe object is provided --> 
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <!-- Recipe Header -->
        <h1>{{ recipe.recipe_name }}</h1> 
        <!-- Display favorite heart icon and button for authenticated users -->
        <b v-if="$root.store.username">
          <img :src="require('@/assets/heart.png')" class="center small-image" v-if="getIsFav" />
          <div>
            <button class="fav-button" @click="addToFavorites" v-if="!getIsFav">
              Add To Favorites
            </button>
        </div>
        </b>

        <!-- Display recipe image --> 
        <img :src="recipe.image_recipe" class="center imagesize" />
      </div>
      <!-- Recipe Body -->
      <div class="recipe-body">
        <div class="wrapper">
          <!-- Left column for summary and ingredients -->
          <div class="wrapped">
            <div class="mb-3 summary">
              <!-- Display recipe summary details -->
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
            <!-- Display list of ingredients -->
            <div class="summary">Ingredients:</div>
            <!-- Check if recipe has ingredients before rendering -->
            <ul v-if="recipe.recipe_ingredient.length">
              <li
                v-for="(i, index) in recipe.recipe_ingredient"
                :key="index + '_' + i.name"
              >
                {{ i.name }} {{ i.amount }} {{ i.unitLong }}
              </li>
            </ul>
            <!-- Display message if no ingredients available -->
            <p v-else>No ingredients available</p>
          </div>


          <!-- Right column for instructions --> 
          <div class="wrapped">
            <div class="summary">Instructions:</div>
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
            <!-- Display message if no instructions available --> 
            <p v-else>No instructions available</p>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
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
  // data() {
  //   return {
  //     isfavorite: false // Initialize local data property
  //   }
  // },
  computed:{
    getIsFav(){
      return this.isfavorite;
    },
  },
  methods: {
    // Method to add the recipe to favorites 
    async addToFavorites() {
      if (!(this.isfavorite)) {
        try {
          // Call API endpoint to add the recipe to favorites for the authenticated user 
          const response = await this.axios.put(
            `${this.$root.store.server_domain}/users/userFavoriteRecipes/${this.recipe.recipe_id}/${this.type}`
          );
          this.onUpdateRecipe();
          this.isfavorite =true;
        } catch (error) {
          console.error(error);
        }
      }
      else{
        console.log("recipe is already in favorites!");
      }
    },
    // Method to handle updating the recipe after adding to favorites
    async onUpdateRecipe() {
      this.RefreshPage();
      this.$root.toast("Save", "Recipes add to favorite successfully", "success");

    },
    // Method to refresh the page after adding the recipe to favorites 
    async RefreshPage() {
    
    // window.location.reload();
    
  }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');

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

.recipe-header{
  font-family: 'Concert One', serif;
  font-size: 30px;
  font-weight: 400;
  color:black;
}
.small-image {
  width: 50px; 
  height: 50px; 
}
.recipe-body{
  background-color: rgba(255, 255, 255, 0.8);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Concert One', serif;
  font-size: 16px;
  font-weight: 400;
  color:black;
  padding: 10px;
}
.summary{
  font-size: 20px;
  font-weight: 400;
}

.fav-button{
  font-family: 'Concert One', serif;
  font-size: 20px;
  font-weight: 400;
  color:black;
  width:20%;
  padding: 8px;
  border-radius: 10px;
}

.fav-button:hover {
  color: black;
  background-color:  rgb(245, 230, 220);
  /* Add other effects like color or box-shadow as needed */
}
.imagesize{
  width: 30rem;
  height: 25rem;
}
</style>