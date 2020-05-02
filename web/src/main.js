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

// 引入mavon-editor
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
  methods: {
    debounce(fnc,delay){
      let timer = null
      return function(...args){
          if(timer)clearTimeout(timer)
          timer = setTimeout(()=>{
              fnc.apply(this,...args)
          },delay)
      }
    },
  }
})

// 引入elementUI
import { Message  } from 'element-ui';
//由于Message组件并没有install 方法供Vue来操作的，是直接返回的，因此按照官方文档单独引入的方法是
//会报错的，需要给 Message 添加 install 方法
Message.install = function (Vue) {
  Vue.prototype.$message = Message
}
Vue.use(Message)//消息提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
