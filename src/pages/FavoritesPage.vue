<template>
    <div class="container">
      Favorites Page
      <RecipePreviewList page_type="favorite" path="/users/userFavoriteRecipes" class="FavoritesRecipes center" /> 
    </div>
</template>
  
<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
    components: {
        RecipePreviewList
    }
    };
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');

.container{
  text-align: center;
  font-family: 'Concert One', serif;
  font-size: 40px;
  font-weight: 400;
  color:black;
}
</style>