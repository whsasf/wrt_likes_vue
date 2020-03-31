<template>
  <div id="main">
    <GtNav></GtNav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import GtNav from '@/views/GtNav.vue'
export default {
  name: 'GtMain',
  components: {
    GtNav
  }
}
</script>

<style scoped>
</style>
