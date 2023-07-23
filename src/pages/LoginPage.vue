<template>
  <div class="container">
    <!-- The login component --> 
    <loginComp class="mt-5"></loginComp>
  </div>
</template>

<script>
import loginComp from "../components/login";
export default {
 
  components: {loginComp: loginComp},

};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap');

.container{
  // text-align: center;
  font-family: 'Concert One', serif;
  font-size: 20px;
  color:black;
  max-width: 600px;
}
.title{
  text-align: center;
  font-size: 40px;
  font-weight: 400;
  padding: 15px;
}
.click-button{
  font-family: 'Concert One', serif;
  font-size: 18px;
  font-weight: 400;
  color:black;
  width:20%;
  padding: 8px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);

}
.click-button:hover{
  color: black;
  background-color:  rgb(245, 230, 220);
}

</style>
