import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import  'vant/lib/index.css'
import global_msg from "./js/global"
import 'lib-flexible'
// 图片浏览组件
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
// 懒加载
import VueLazyload from "vue-lazyload"

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Vant)
Vue.use(Viewer)

// 或者添加VueLazyload 选项
Vue.use(VueLazyload, {
  loading: "/loading.png"
})

Viewer.setDefaults({
  'inline': true,
  'button': true, //右上角按钮
  "navbar": true, //底部缩略图
  "title": true, //当前图片标题
  "toolbar": true, //底部工具栏
  "tooltip": true, //显示缩放百分比
  "movable": true, //是否可以移动
  "zoomable": true, //是否可以缩放
  "rotatable": true, //是否可旋转
  "scalable": false, //是否可翻转
  "transition": true, //使用 CSS3 过度
  "fullscreen": true, //播放时是否全屏
  "keyboard": true, //是否支持键盘
  "url": "data-source",
});

Vue.config.productionTip = false
Vue.prototype.$global_msg = global_msg

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
