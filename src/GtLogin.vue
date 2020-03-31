<template>
  <center>
   <form class="form" @submit.prevent="submitFrom">
      <div class="text-danger text-left font-weight-bold" v-show="warnWindowFlag">{{ rspMessage[rspCode] }}</div>
      <div><input type="text" v-model.trim="username" placeholder="用户名" ></div>
      <div><input type="password" v-model.trim="password" placeholder="密 码" ></div>
      <button type="submit" class="btn btn-primary btn-block bg-success">确定</button>
   </form>
   </center>
</template>

<script>
import qs from 'qs' // string dict data
import store from './store'
export default {
  name: 'GtLogin',
  data () {
    return {
      username: '',
      password: '',
      rspCode: 0,
      rspMessage: {
        0: '睡觉',
        200: '登陆成功',
        206: '账号/密码错误,请重试',
        207: '账号不存在'
      },
      connectUrl: store.state.serverBaseUrl
    }
  },
  computed: {
    warnWindowFlag: function () {
      if (this.rspCode > 200) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    // if this.username or this.password change, hide warn window
    username: function (newV, oldV) {
      this.rspCode = 209
    },
    password: function (newV, oldV) {
      this.rspCode = 209
    }
  },
  created () {
    localStorage.setItem('wrt_likes_usernane', '')
    this.$store.state.username = ''
  },
  methods: {
    submitFrom: function () {
      var self = this
      this.axios({
        method: 'post',
        url: self.connectUrl + '/wrt_likes/loggin',
        data: qs.stringify({
          userName: self.username,
          passWord: self.password
        })
      })
        .then(response => {
          self.rspCode = response.data.code
          if (self.rspCode === 200) {
            self.$store.state.username = self.username
            // save usrename into localstorage
            localStorage.setItem('wrt_likes_usernane', self.username)
            self.$router.push({ path: 'main' })
          }
        })
        .catch(error => {
          console.log('error h')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  form.form {
    max-width: 50%;
    padding-top: 100px;
  }
  button, input {
    width: 100%;
    margin-top: 0.9375rem;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    padding-top: 0.3125rem;
    padding-right: 0.3125rem;
    padding-bottom: 0.3125rem;
    padding-left: 0.3125rem;
  }
  button {
    border: 0
  }
</style>
