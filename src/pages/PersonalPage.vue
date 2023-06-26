<template>
  <div class="container">
    <h1 class="title">Personal Page</h1>
    <RecipePreviewList
        type="personal"  
        path="/users/userPersonalRecipes"
      title="Personal Recipes"
      class="PersonalRecipes center"
    />
  </div>
</template>
  
<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
};
</script>