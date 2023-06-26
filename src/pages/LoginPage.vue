<template>
  <div class="container">
    <loginComp></loginComp>
  </div>
</template>

<script>
import loginComp from "../components/login";
export default {
 
  components: {loginComp: loginComp},

};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
