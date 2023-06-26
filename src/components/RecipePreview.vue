<template>
  <!-- <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div> 
      <ul class="recipe-overview">
        <li>{{ recipe.prepare_time }} minutes</li>
        <li>{{ recipe.likes }} likes</li>
      </ul>
    </div>
  </router-link> -->
<div> 
  <router-link :to="{ name: 'recipe', params: {recipe: recipe} }">
  <!-- TO DO: check if image load  --> 
  <b-card
    :title="recipe.recipe_name"
    :img-src="recipe.image_recipe" 
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <ul class="recipe-overview">
        <li><b>prepare_time = {{recipe.prepare_time}}</b><br/></li>
        <li><b>like= {{recipe.likes}}</b><br/></li>
        <li><b>is_vegan = {{recipe.is_vegan}}</b><br/></li>
        <li><b>is_veget= {{recipe.is_veget}}</b><br/></li>
        <!-- viewed - just for now to have indication -->
        <li><b>viewed= {{this.viewed}}</b><br/></li>
      </ul>
      <!-- TODO:  viewedRecipes:{{viewedRecipes}} -->
       <!-- TODO:  favRecipes:{{favRecipes}} -->
    </b-card-text>
    <!-- <b-button variant="primary">ADD TO FAVORITE </b-button>     -->
    <router-link :to="{ name: 'recipe', params: {recipe: recipe, type: type} }" tag="button">View Recipe</router-link>
    <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
  </b-card>
  </router-link>
</div>
</template>

<script>
export default {
  mounted() {
   
    // this.axios.get(this.recipe.image_recipe).then((i) => {
    //   this.image_load = true;
    // });
  },
  data() {
    return {
      image_load: false,
      
    };
  },
  
  props: {
    recipe: {
      type: Object,
      required: true
    },
    viewed: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;

}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
  color:black;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
  color:black;
}
</style>
