import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [// 路由位置
  {
    path: '/',
    name: 'layout',
    component: () => import('@/view/layout'),
    redirect:'/home',

    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/view/layout/home')
      }, {
        path: '/question',
        name: 'question',
        component: () => import('@/view/layout/question')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/view/layout/video')
      }
      , {
        path: '/user',
        name: 'user',
        component: () => import('@/view/layout/user')

      }
    ]
  },
  {
    path: "/login",
    name: 'login',
    component: () => import('@/view/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
