<template>
   <Panel>
        <div slot="titleslot" class="col-8 text-green text-center"><h1 href="#" v-text="title"></h1></div>
        <template v-if="realUserName">
        <div slot="nameslot" class="col-2 align-self-end" v-text="'用户: '+realUserName"></div>
        <div slot="exitslot" class="col-2 text-right align-self-end "><router-link to='/login' @click.native="logout" class="text-white" v-text="exit"></router-link></div>
        </template>
        <template v-else>
          <div slot="nameslot" class="col-2 align-self-end" v-text="useNameHolder"></div>
        </template>
    </Panel>
</template>

<script>
import Panel from '@/components/Panel.vue'
import store from '../store'
export default {
  name: 'GtPanel',
  data () {
    return {
      useNameHolder: ' ',
      title: '喜洋洋点赞自助查询系统',
      exit: '退出登录',
      connectUrl: store.state.serverBaseUrl
    }
  },
  components: {
    Panel
  },
  computed: {
    realUserName: function () {
      if (this.$store.state.username) {
        return this.$store.state.username
      } else if (localStorage.getItem('wrt_likes_usernane')) {
        return localStorage.getItem('wrt_likes_usernane')
      } else {
        return ''
      }
    }
  },
  methods: {
    logout: function () {
      var self = this
      self.$store.state.username = ''
      localStorage.setItem('wrt_likes_usernane', '')
      // force to clear realUserName
      self.realUserName = ''
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/loggout'
      })
        .then(function (response) {
          if (response.data.code === 200) {
            // self.$router.push({ path: '/login' })
            console.log('logout success')
          }
        })
        .catch(function (error) {
          console.log(error.response.data)
        })
    }
  }
}
</script>
<style>
  body {
      background-image: url(../assets/images/likes_collections_website_background.jpg);
    }
  div#app {
    padding-top: 30px
  }
  a.router-link-exact-active {
    background-color: #fff
  }
  div.container {
    background-color: #fff;
    margin-bottom: 100px
  }
</style>
