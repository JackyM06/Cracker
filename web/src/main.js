import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import http from './network/http'
Vue.prototype.$http = http

import './assets/scss/style.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
