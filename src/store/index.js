import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer:null,
    user:localStorage.getItem('user'),
    ip:'http://192.168.1.7:8000'
  },
  mutations: {
    DRAWER(state,payload){
      state.drawer=payload;
    },
  },
  actions: {
  },
  modules: {
  }
})