<template>
  <div id="app">
   <router-view></router-view>
   <Loading
        :active.sync="$store.state.vueLoadingIsLoading"
        :can-cancel="$store.state.vueLoadingCanCancel"
        :is-full-page="$store.state.vueLoadingFullPage"
        :loader="$store.state.vueLoadingLoader"
        :opacity="$store.state.vueLoadingOpacity"
        :background-color="$store.state.vueLoadingBg"
        :height="$store.state.vueLoadingHeight"
        :width="$store.state.vueLoadingWidth">
    </Loading>
   </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'App',
  components: {
    Loading
  }
}
</script>
<style scoped>
 div#app {
    position: relative
  }
</style>
