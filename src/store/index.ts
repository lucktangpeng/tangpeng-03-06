import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.user || null)
  },
  mutations: {
    setUser (state, val) {
      state.user = JSON.parse(val)
      window.localStorage.user = val
    },
    clearUser (state, val) {
      state.user = val
      window.localStorage.user = val
    }
  },
  actions: {
  },
  modules: {
  }
})