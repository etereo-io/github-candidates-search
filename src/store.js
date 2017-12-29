import Vue from 'vue'
import Vuex from 'vuex'

import github from './store/github'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    github,
  },
})
