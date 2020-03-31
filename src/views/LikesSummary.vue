<template>
      <div class="container tab-pane active">
          <br>
          <div class="col-8">
              <label for="sel1"><h5>可查询Campaign:</h5></label>
                  <form id="download_camp_reports" >
                      <div id='bk'>
                        <div class="form-check" v-for="(item, index) in campaignList" :key="index">
                            <input name="select"  type="checkbox" class="form-check-input" :value="item" v-model="mycheckedList">
                            <label>{{item}}</label>
                        </div>
                      </div>
                      <label class="form-check-label col-2">
                          <input  name="selectall" type="checkbox" class="form-check-input" id="quanxuan" value="all" @click="checkAll" v-model="checked">全选
                      </label>
                      <label class="form-check-label col-3">
                          <input name="merge_flag" type="checkbox" class="form-check-input" id="merge_multi" value="merge" >合并结果
                      </label>
                  </form>
          </div>
          <br>
          <button type="button" class="btn btn-success" @click="download_camp_reports">查询点赞统计</button>
          <br>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'LikesSummary',
  data () {
    return {
      checked: false,
      mycheckedList: [],
      campaignList: [],
      connectUrl: store.state.serverBaseUrl
    }
  },
  created () {
    this.getCampList()
  },
  computer: {
  },
  watch: {
    checked: function (newx, oldx) {
      if (newx === true) {
        this.mycheckedList = this.campaignList
      } else {
        this.mycheckedList = []
      }
    }
  },
  methods: {
    getCampList: function () {
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/campaign_list/'
      })
        .then(function (response) {
          // self.$nextTick(function () {
          self.campaignList = response.data
          // })
        })
        .catch(function (error) {
          console.log(error.response.data)
        })
    },
    checkAll: function () {
      if (this.checked) {
        this.checked = false
      } else {
        this.checked = true
      }
    },
    download_camp_reports: function () {
      var self = this
      var form = new FormData(document.getElementById('download_camp_reports'))
      // console.log(form)
      this.axios({
        method: 'post',
        url: self.connectUrl + '/wrt_likes/query_likes/',
        data: form
      })
        .then(function (response) {
          console.log('create camp report success')
          // console.log(response.data)
          var data = response.data.slice(0, response.data.length - 1)
          data = data.split('|')
          // console.log(data)
          var downloadUrls = []
          for (var i = 0; i < data.length; i++) {
            var fullUrl = self.connectUrl + '/static/likes_result_data/' + data[i]
            const newPromise = self.axios({
              method: 'get',
              url: fullUrl,
              responseType: 'blob'
            })
            downloadUrls.push(newPromise)
          };
          // console.log(downloadUrls)
          self.axios.all(downloadUrls)
            .then(function (response) {
              for (var j = 0; j < response.length; j++) {
                const blob = new Blob(
                  [response[j].data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                const aEle = document.createElement('a') // 创建a标签
                const href = window.URL.createObjectURL(blob) // 创建下载的链接
                aEle.href = href
                aEle.download = data[j] // 下载后文件名
                document.body.appendChild(aEle)
                aEle.click() // 点击下载
                document.body.removeChild(aEle) // 下载完成移除元素
                window.URL.revokeObjectURL(href) // 释放掉blob对象
              };
            }).catch(function (error) {
              console.log(error.response.data)
            })
        })
        .catch(function (error) {
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style scoped>
  div#bk {
    background-color:rgb(156, 236, 187)
  }
</style>
