import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'assets/scss/style.scss'

import ECharts from 'vue-echarts'
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
Vue.component('chart', ECharts)

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.component('mavonEditor',mavonEditor)

import dayjs from 'dayjs'
Vue.mixin({
  filters:{
    data(e){
        return dayjs(e).format('YY/MM/DD HH:mm')
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
