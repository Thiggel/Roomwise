<template>
  <minimal-header></minimal-header>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400&display=swap');
@import url('https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css');
</style>

<script lang="ts">
import MinimalHeader from "@/components/organisms/MinimalHeader.vue"

export default {
  components: {MinimalHeader}
}
</script>