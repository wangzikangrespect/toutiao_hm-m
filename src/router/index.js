import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入login组件
import login from "@/view/login"

Vue.use(VueRouter)

const routes = [// 路由位置
  {
    path: '' || '/', //当路径为空时自动跳转到登录页面
    redirect: "path"
  },
  {
    path: "/path",
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
