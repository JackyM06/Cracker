import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'assets/scss/style.scss'

import ECharts from 'vue-echarts'
import echarts from 'echarts'
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.component('mavonEditor',mavonEditor)

import dayjs from 'dayjs'
Vue.mixin({
  filters:{
    date(e,createdAt,format='YY/MM/DD HH:mm'){
        if(createdAt){
          const minute = -parseInt(dayjs(e).diff(dayjs(),'minute')) //获取时间差
          if(e == createdAt){
            return "从未更新"
          }else if(minute < 5){
            return "刚刚"
          }else if (minute <30){
            return minute+'分钟前'
          }
        }
        return dayjs(e).format(format)
    }
  },
  computed: {
    uploadURL(){
      return this.$http.defaults.baseURL+'/upload'
    },
    authHeader(){
      return  {Authorization:'Bearer '+localStorage.token}
    }
  }
})

import http from './network/http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')