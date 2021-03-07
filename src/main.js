import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css' /* 导入全局样式表 */
import './assets/fonts/iconfont.css' /* 导入字体图标 */
import axios from 'axios' /* 挂载请求 */
import TreeTable from 'vue-table-with-tree-grid'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' // 配置请求根路径 每次都和s较劲。。
// 添加请求拦截器=>预处理过程：通过axios请求拦截器添加token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
  // 在最后必须return config
})
// 通过use为请求拦截器挂载回调函数 config 请求对象
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
