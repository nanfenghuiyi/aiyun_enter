import Vue from "vue";
import axios from "axios";
import global from "./js/global";
// import qs from "qs";


// 发送请求保存session信息
axios.defaults.withCredentials = false
// 设置请求路径
axios.defaults.baseURL = global.baseUrl;
// axios.defaults.baseURL = "http://118.190.203.67:8080"  // 测试
// axios.defaults.baseURL = "https://aybapi.a56999.com"  // 正式

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log('config===', config)
  // 在发送请求之前做些什么
  if (window.localStorage.getItem('access_token')) {
    config.headers.Authorization = window.localStorage.getItem('access_token');
  }
  // console.log(localStorage.getItem('access_token'));
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
    console.log('响应拦截器error===', error)
    try {
      if (error.response) {
        switch (error.response.status) {
          case 401://token过期，清除它,清除token信息并跳转到登录页面
            this.$store.commit('_removeToken', 'access_token');
            this.$store.commit('_removeUsername', 'username');
            router.replace({
              path: '/',
            });
            return;
        }
      }
      return Promise.reject(error.response.data)
    }
    catch (e) {
    }
})

// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.responseType = 'json'

Vue.prototype.axios = axios