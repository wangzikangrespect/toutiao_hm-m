import Vue from 'vue'
import Vuex from 'vuex'
// 引入存储方法
import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'USER_TOKEN'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    commentList: []
  },
  getters: {
  },
  mutations: {
    storageFn(state, data) {
      state.user = data
      setItem(USER_KEY, data)
    },
    removeItemFn() {
      removeItem(USER_KEY)
    },
    asCommentList(state, list) {
      state.commentList = list

    },
    addCommentList(state, comment) {
      state.commentList.unshift(comment)
    }
  },
  actions: {
  },
  modules: {
  }
})
