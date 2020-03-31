<template>
    <ul class="nav nav-tabs" role="tablist">
      <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
      <li class="nav-item font-weight-bold bg-success border border-light" v-for="(item, index) in tabsitems" :key="index">
         <router-link class="nav-link text-dark" data-toggle="tab" :to="'/main/'+item.id" v-text="item.tab" ></router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'GtNav',
  data () {
    return {
      tabsitems: [
        { id: 'likesSummary', tab: '点赞统计查询' },
        { id: 'likesMonitor', tab: '实时点赞查询' },
        { id: 'newCamp', tab: '新建Campaign' },
        { id: 'ipLib', tab: 'China IP库' }
      ]
    }
  },
  components: {
  }
}
</script>
<style scoped>
</style>
