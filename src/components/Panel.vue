<template>
  <div class="card-header bg-success">
      <div class="row ">
          <slot name="nameslot"></slot>
          <slot name="titleslot"></slot>
          <slot name="exitslot"></slot>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Panel',
  components: {
  }
}
</script>
<style scoped>
</style>
