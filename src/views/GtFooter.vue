<template>
  <Footer>
    <li slot="mailslot"><a :href="mail" class="text-white" target="_blank" v-text="atme"></a></li>
    <li slot="beianslot"><a :href="beianlink" class="text-white" target="_blank" v-text="beianno"></a></li>
  </Footer>
</template>

<script>
import Footer from '@/components/Footer.vue'
import store from '../store'
export default {
  name: 'GtFooter',
  components: {
    Footer
  },
  data () {
    return {
      atme: store.state.atme,
      mail: store.state.mail,
      beianno: store.state.beianno,
      beianlink: store.state.beianlink
    }
  }
}
</script>
