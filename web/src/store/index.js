import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LoginShow:false,
    RegisterShow:false,
    Logged:localStorage.Cracker
  },
  mutations: {
    closeLoginShow(state){
      state.LoginShow = false
    },
    closeRegisterShow(state){
      state.RegisterShow = false
    },
    openLoginShow(state){
      state.LoginShow = true
    },
    openRegisterShow(state){
      state.RegisterShow = true
    },
    LoginOut(state){
      state.Logged = false
    },
    Login(state){
      state.Logged = true
    }
  },
  actions: {
  },
  modules: {
  }
})
