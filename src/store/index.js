import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    vueLoadingIsLoading: false,
    RemindIsRemiding: false,
    vueLoadingCanCancel: false,
    vueLoadingFullPage: false,
    vueLoadingLoader: 'bars',
    vueLoadingOpacity: 0.5,
    vueLoadingBg: '#725353',
    vueLoadingHeight: 128,
    vueLoadingWidth: 128,
    serverBaseUrl: 'https://www.whsasf.com:8082',
    atme: 'powered by @whsasf',
    mail: 'whsasfdefy@gmail.com',
    beianno: '沪ICP备19037220号-1',
    beianlink: 'http://www.beian.miit.gov.cn/'
  },
  mutations: {
    upside (state) {
      state.vueLoadingIsLoading = !state.vueLoadingIsLoading
    }
  },
  actions: {
  },
  modules: {
  }
})
