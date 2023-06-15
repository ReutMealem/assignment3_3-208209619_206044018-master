<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_name }}</h1>
        <img :src="recipe.image_recipe" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.prepare_time }} minutes</div>
              <div>Likes: {{ recipe.likes }} likes</div>
              <div> Portion: {{ recipe.portions}}</div>
              <div v-if="recipe.is_vegan"> Vegan </div>
              <div v-if="recipe.is_veget"> Vegetarian </div>
              <div v-if="recipe.is_glutenFree"> GlutenFree </div>

            </div>
            Ingredients:
            <ul>
              <li
                v-for="(i, index) in recipe.recipe_ingredient"
                :key="index + '_' + i.name"
              >
                {{ i.name }} {{i.amount}} {{i.unitLong}}

              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              
              <li v-for="s in recipe.recipe_instruction[0].steps" :key="s">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {

      this.recipe = this.$route.params.recipe;
      console.log("HERE RECIPE:", this.recipe.recipe_id);
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
/* .recipe-header{

} */
</style>
