<template >
  <div class = "bgrd">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HomeComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/Home/Home.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>

<style>

.bgrd {
  height: 100%;
  overflow: hidden;
  }
</style>


