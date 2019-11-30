import Vue from 'vue'
import Vuex from 'vuex'

// vuex 存数据，读数据
Vue.use(Vuex)
const access_token = 'access_token';
const username = 'username';
const store = new Vuex.Store({
  // 要存的初始数据
  state: {
    access_token: '',
    username: ''
  },
  // 通过 mutations修改数据
  mutations: {
    // 设置数据 进入 localStorage
    // startPoint(state,value){
    //   state.token = value
    // },
    _setTokenStorage(state, value) {
      state.access_token = value
      localStorage.setItem(access_token, value)  // localStroage.setItem(key,数据值) 设置存入缓存
    },
    _setUsernameStorage(state, value) {
      state.username = value
      localStorage.setItem(username, value)
    },
    _removeToken(state) {
      state.access_token = ''
      localStorage.removeItem(access_token)  // localStorage.removeItem(key) 删除缓存
    },
    _removeUsername(state) {
      state.username = ''
      localStorage.removeItem(username)
    }
  },
  actions: {},
  // 通过getters 获取数据
  getters: {
    getStorage(state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key)) // localStorage.getItem(key) // 获取缓存中的数据
      }
      return state.user
    }
  }
})
export default store
