import { createStore } from 'vuex'
import app from './modules/app'
import getters from './getters' // 拿到导出的getters对象

export default createStore({
  state: {
  },
  // getters: {
  // },
  mutations: {
  },
  actions: {
  },
  modules: {
    app
  },
  getters

})
