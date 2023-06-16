<template>
    <div class="container">
      <h1 class="title">Favorites Page</h1>
      <RecipePreviewList path="/users/userFavoriteRecipes" title="Favorites Recipes" class="FavoritesRecipes center" /> 
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