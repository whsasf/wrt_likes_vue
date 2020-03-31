import Vue from 'vue'
import router from './router'
import App from './App.vue'
// import GtHeader from './views/GtHeader.vue'
import GtPanel from './views/GtPanel.vue'
import GtFooter from './views/GtFooter.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// axios interceptors
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
  store.commit('upside') // 在请求发出之前进行一些操作
  return config
},
function (error) {
  store.commit('upside')
  return Promise.reject(error)
})

// 定义一个响应拦截器
axios.interceptors.response.use(function (response) {
  store.commit('upside')// 在这里对返回的数据进行处理
  return response
},
function (error) {
  store.commit('upside')
  if (error.response.status === 403) {
    store.commit('upside')// 在这里对返回的数据进行处理
    // init username
    store.state.username = ''
    localStorage.setItem('wrt_likes_usernane', '')
    router.push('/login')
    store.commit('upside')// 在这里对返回的数据进行处理
  } // else {
  return Promise.reject(error)
  // }
}
)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// new Vue({
//  render: h => h(GtHeader)
// }).$mount('#myheader')

new Vue({
  store,
  router,
  render: h => h(GtPanel)
}).$mount('#panel')

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

new Vue({
  render: h => h(GtFooter)
}).$mount('#footer')
