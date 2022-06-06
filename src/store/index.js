import Vue from 'vue'
import Vuex from 'vuex'
// 引入存储方法
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'USER_TOKEN'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  getters: {
  },
  mutations: {
    storageFn(state, data) {
      state.user = data
      setItem(USER_KEY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
