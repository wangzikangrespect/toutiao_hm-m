import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 该插件用于加载动态设置rem基准值
import 'amfe-flexible'
// 引入全局样式
import '@/styles/css/css.css'
// 引入字体图标
import '@/assets/font/iconfont.css'

// 注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
