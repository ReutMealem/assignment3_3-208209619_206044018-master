<template>
  <div>
    <!-- Link to view the detailed recipe -->
    <router-link :to="{ name: 'recipe', query: { recipe: JSON.stringify(recipe), type: type, favor: favorite } }">
      <b-card tag="article" style="width: 50rem; height: 23rem;" class="mb-2">
        <div class="row">
          <!-- Recipe Image -->
          <div class="col-md-6">
            <img :src="recipe.image_recipe" :alt="recipe.recipe_name" class="recipe-image" />
          </div>
          <!-- Recipe Details -->
          <div class="col-md-6">
            <b-card-text>
              <h5 class="card-title">{{ recipe.recipe_name }}</h5>
              <ul class="recipe-overview" style="list-style-type: none;">
                <li>
                  <b><img :src="require('@/assets/clock.png')" height="30" width="30" alt="!"> {{ recipe.prepare_time }} Minutes</b><br />
                </li>
                <li>
                  <b><img :src="require('@/assets/likes.png')" height="30" width="30" alt="!"> {{ recipe.likes }} Likes</b><br />
                </li>
                <li v-if="recipe.is_vegan">
                  <b><img :src="require('@/assets/vegan.png')" height="30" width="30" alt="!"> Vegan</b><br />
                </li>
                <li v-if="recipe.is_veget">
                  <b><img :src="require('@/assets/vegetarian.png')" height="30" width="30" alt="!"> Vegetarian</b><br />
                </li>
                <li v-if="recipe.is_glutenFree">
                  <b><img :src="require('@/assets/glutenFree.png')" height="30" width="30" alt="!"> Gluten Free</b><br />
                </li>
              <!-- Display icons for viewed and favorite recipes -->
                <li v-if="viewed || favorite">
                  <img :src="require('@/assets/eye.png')" class="small-image" v-if="viewed" />
                  <img :src="require('@/assets/heart.png')" class="small-image" v-if="favorite" />
                </li>
              </ul>
            </b-card-text>
            <!-- Link to view the recipe details -->
            <router-link :to="{ name: 'recipe', query: { recipe: JSON.stringify(recipe), type: type, favor: favorite } }" class="view-button" tag="button">View Recipe</router-link>
          </div>
        </div>
      </b-card>
    </router-link>
  </div>
</template>



<script>
export default {
  mounted() {
    this.checkImageValidity();
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
    },
    favorite:{
      type: Boolean,
      required: true
    }
  },
  methods: {
async checkImageValidity() {
    const imageUrl = this.recipe.recipe_image;
    
    try {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

    } catch (error) {
      this.recipe.recipe_image = require('@/assets/spongebob-imagination-icegif.gif');
    }
  }
  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');
.view-button{
  align-items: center;
  width:100%;
  padding: 8px;
  border-radius: 10px;
  font-family: 'Concert One', serif;
  font-size:16px;
  font-weight: 400;
  color:black;
  margin-bottom: 0px;
}
.view-button:hover {
  color:white;
  background-color:  #28b1bd;
  /* Add other effects like color or box-shadow as needed */
}
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

.small-image {
  width: 30px; 
  height: 30px; 
}


.card {
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Concert One', serif;
  font-size: 16px;
  font-weight: 400;
  color:black;

}

.recipe-image {
  width: 100%;
  height: auto;
}
</style>