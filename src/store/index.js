import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer:null,
    user:localStorage.getItem('user')
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