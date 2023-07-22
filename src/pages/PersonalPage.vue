<template>
  <div class="container">
    <div class="title">Personal Page</div>
    <!-- Include the RecipePreviewList component to display personal recipes -->
    <RecipePreviewList
        page_type="personal"  
        path="/users/userPersonalRecipes"
       class="PersonalRecipes center"/>
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
  font-family: 'Concert One', serif;
  font-size: 20px;
  color:black;
}
.title{
  font-size: 40px;
  font-weight: 400;
  text-align: center;

}
</style>