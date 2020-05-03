import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入elementUI - Message & MessageBOx
import {Message,MessageBox,Upload} from 'element-ui'
Vue.use(Upload)
Vue.prototype.$message = Message;
Vue.prototype.$MessageBox = MessageBox;

import http from './network/http'
Vue.prototype.$http = http
// Bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import 'jquery'

import './assets/scss/style.scss'

import './assets/iconfont/iconfont'

// 引入mavon-editor
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.component('mavonEditor',mavonEditor)
// 粘贴板工具
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
