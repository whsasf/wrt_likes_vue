<template>
  <footer class="text-center text-small bg-success fixed-bottom" >
      <ul class="list-inline">
          <slot name="mailslot"></slot>
          <slot name="beianslot"></slot>
      </ul>
  </footer>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>
</style>
