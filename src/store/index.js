import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

// 初始化 vuex,注册插件
Vue.use(Vuex)

// 极乐世
const debug = process.env.NODE_ENV !== 'production'

// 抛出实例，单例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
