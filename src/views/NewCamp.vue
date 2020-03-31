<template>
  <div id="tab-3" class="container tab-pane">
    <br>
      <div class="row">
        <div class=" form-group col-7 order-1" >
            <label class="col-4" for="campTitle">Campaign 标题: </label><input type="text" style="color:#041D41" class="form-contrl col-7" id="campTitle" v-model="campTitle">
            <label class="col-4" for="campName">Campaign 名称: </label><input type="text" style="color:#041D41" class="form-contrl col-7" id="campName" v-model="campName">
            <label class="col-4" for="campTime">Campaign 时间: </label><input type="text" style="color:#041D41" class="form-contrl col-7" id="campTime" v-model="campTime">
            <label class="col-4" for="campCities">Campaign 城市: </label>
            <textarea wrap="off" class="form-contrl  col-11" rows="4" style="color:#041D41" id="campCities" v-model="campCities"></textarea>
            <label class="col-4" for="campGoods">Campaign 商品: </label>
            <textarea wrap="off" class="form-contrl  col-11" rows="6"  style="color:#041D41" id="campGoods" v-model="campGoods"></textarea>
            <button type="button" class="btn btn-success  col-5">提交/保存 Campaign</button>
            <button type="button" class="btn btn-danger offset-2 col-4">删除 Campaign</button>
        </div>
        <div class="col-5 order-2">
          <div class="form-group">
              <label for="sel1"><h5>查询Campaign:</h5></label>
              <select class="form-control" id="sel1" v-model="mySelect">
                <option value="" >--点此选择查看campaign--</option>
                <option v-for="(item, index) in campaignList" :key="index" :value="item">{{ item }}</option>
              </select>
              <br>
              <hr>
              <button type="button" for="camp_cat_goods" class="btn btn-success" @click="fetchGoodsCategory">查询商品</button>
              <br>
              <textarea wrap="off" class="form-contrl col-11" style="color:#041D41" rows="10" id="camp_cat_goods" v-model="categoryGoods"></textarea>
              <br>
              <button type="button" for="camp_cat_goods" class="btn btn-danger">保存商品修改</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'newCamp',
  data () {
    return {
      campaignList: [],
      campTitle: '',
      campName: '',
      campTime: '',
      campCities: '',
      campGoods: '',
      categoryGoods: '',
      mySelect: '',
      connectUrl: store.state.serverBaseUrl
    }
  },
  created () {
    this.getCampList()
  },
  watch: {
    mySelect: function (newv, oldv) {
      if (newv) {
        this.fetchCampInfo(newv)
      } else {
        this.campTitle = ''
        this.campName = ''
        this.campTime = ''
        this.campCities = ''
        this.campGoods = ''
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
    fetchGoodsCategory: function () {
      this.categoryGoods = ''
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/goods_category/'
      })
        .then(function (response) {
          var data = response.data
          var xxx = ''
          for (var e = 0; e < data.length; e++) {
            xxx = xxx + data[e] + ',\n'
          };
          self.categoryGoods = xxx
        })
        .catch(function (error) {
          self.categoryGoods = error.response.data
        })
    },
    fetchCampInfo: function (para) {
      var self = this
      this.axios({
        method: 'get',
        url: self.connectUrl + '/wrt_likes/camp_info/?query_camp_title=' + para
      })
        .then(function (response) {
          var data = response.data
          // console.log(data)
          self.campTitle = data.camp_title
          self.campName = data.camp_name
          self.campTime = data.camp_time
          var cityListStr = ''
          for (var i = 0; i < data.camp_city.length; i++) {
            cityListStr = cityListStr + data.camp_city[i] + '\n'
          };
          self.campCities = cityListStr
          var goodsListStr = ''
          for (var j = 0; j < data.camp_goods.length; j++) {
            goodsListStr = goodsListStr + data.camp_goods[j] + '\n'
          };
          self.campGoods = goodsListStr
        })
        .catch(function (error) {
          console.log(error.response.data)
          // this.category_goods = error.response.data;
        })
    }
  }
}
</script>

<style scoped>
</style>
