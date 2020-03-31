<template>
  <div id="tab-2" class="container tab-pane">
    <br>
    <div class="row ">
      <button type="button" class="btn btn-info col-2" @click="apirequest" >触发一个请求</button>
      <button type="button" for="logs" class="btn btn-success offset-1 col-2" @click="fetchRealLog" >刷新</button>
      <input type="text" class="form-control  offset-1 col-3" id="filter" :placeholder="placeholder" v-model="filterLogContent">
      <button type="button" fpr="logs" class="btn btn-success offset-1" @click="fetchRealLogFilter">过滤</button>
      <br>
      <textarea class="form-contrl col-11" rows="15" id="logs" wrap="off" v-model="realLog" style="overflow:scroll;"></textarea>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'likesMonitor',
  data () {
    return {
      placeholder: '请输入过滤条件',
      realLog: '',
      filterLogContent: '',
      connectUrl: store.state.serverBaseUrl
    }
  },
  created () {
    this.fetchRealLog()
  },
  methods: {
    apirequest: function () {
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/data/?item="testitem"&action="like"&camp=testcamp&pub="toutiao"'
      })
        .then(function (response) {
          self.fetchRealLog()
        })
        .catch(function (error) {
          self.fetchRealLog()
          console.log(error)
        })
    },
    fetchRealLog: function () {
      var self = this
      this.filterLogContent = ''
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/real_log/'
      })
        .then(function (response) {
          // console.log(response);
          self.realLog = response.data
        })
        .catch(function (error) {
          // console.log(error);
          self.realLog = error.response.data
        })
    },
    fetchRealLogFilter: function () {
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/real_log_filter/?filter_data=' + this.filterLogContent
      })
        .then(function (response) {
          // console.log(response);
          self.realLog = response.data
        })
        .catch(function (error) {
          // console.log(error);
          self.realLog = error.response.data
        })
    }
  }
}
</script>

<style scoped>
  textarea {
    margin: 5px
  }
</style>
