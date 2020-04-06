import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import http from './network/http'
Vue.prototype.$http = http

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import 'jquery'

import './assets/scss/style.scss'

import './assets/iconfont/iconfont'

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
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
