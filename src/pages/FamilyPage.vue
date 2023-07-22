<template>
    <div class="container">
      <div class="title">Family Page</div>
      
    <!-- RecipePreviewList component to display family recipes --> 
      <RecipePreviewList  page_type="family" path="/users/userFamilyRecipes" class="FamilyRecipes center" /> 
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