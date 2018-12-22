// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）

export function createStore () {
  return new Vuex.Store({
    state: {
      msg: '',
    },
    actions: {
      fetchItem ({ commit }) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return  Vue.axios.get('http://localhost:8080/test').then((response) => {
          commit('setItem', { msg: response.data.msg })
        })
      }


    },
    mutations: {
      setItem (state, { msg }) {
        state.msg = msg
      }
    }
  })
}