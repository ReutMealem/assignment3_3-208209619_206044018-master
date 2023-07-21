<template>
  <div class="container">
    <h1 class="title">Personal Page</h1>
    <RecipePreviewList
        page_type="personal"  
        path="/users/userPersonalRecipes"
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
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');

.container{
  text-align: center;
  font-family: 'Concert One', serif;
  font-size: 30px;
  font-weight: 400;
  color:black;
}
</style>