<template>
    <div class="container">
      <h1 class="title">Family Page</h1>
      <RecipePreviewList  page_type="family" path="/users/userFamilyRecipes" title="Family Recipes" class="FamilyRecipes center" /> 
    </div>
</template>
  
<script>
    import RecipePreviewList from "../components/RecipePreviewList";
    export default {
    components: {
        RecipePreviewList
    },
    };
</script>