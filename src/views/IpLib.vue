<template>
  <div id="tab-4" class="container tab-pane">
      <br>
          <h3 v-if="ipLibStatus"><span>当前状态:</span><img src='../assets/images/OK.png'/> <span>已经录入</span></h3>
          <h3 v-else><span>当前状态:</span><img src='../assets/images/NOK.png'/> <span>等待录入</span></h3>
      <hr>
      <div class="row">
      <label class="col-2 align-self-center" for="inputGroupFile01">上传 CHINA IP 库: </label>
      <div class="input-group mb-3 offset-1 col-8">
          <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile">
              <label class="custom-file-label" for="customFile" v-text="fileUpload"></label>
            </div>
        </div>
      </div>
      <hr>
      <br>
      <button type="button" class="btn btn-success col-3">上传</button>
      <button type="button" class="btn btn-success offset-1 col-3" @click="downloadIpKu">下载</button>
      <button type="button" class="btn btn-danger offset-1 col-3">删除</button>
      <br> <br>
    </div>
</template>

<script>
import store from '../store'
export default {
  name: 'ipLib',
  data () {
    return {
      ipLibStatus: false,
      fileUpload: '请选择文件',
      connectUrl: store.state.serverBaseUrl
    }
  },
  created () {
    this.getIpLibStatus()
  },
  methods: {
    getIpLibStatus: function () {
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/ip_lib_status/'
      })
        .then(function (response) {
          self.ipLibStatus = response.data
        })
        .catch(function (error) {
          console.log(error.response.data)
        })
    },
    downloadIpKu: function () {
      this.axios({
        method: 'get',
        url: self.connectUrl + '/static/china_ipku/china_ip_ku.csv'
      })
        .then(function (response) {
          const blob = new Blob(
            [response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          const aEle = document.createElement('a') // 创建a标签
          const href = window.URL.createObjectURL(blob) // 创建下载的链接
          aEle.href = href
          aEle.download = 'china_ip_ku.csv' // 下载后文件名
          document.body.appendChild(aEle)
          aEle.click() // 点击下载
          document.body.removeChild(aEle) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
</style>
