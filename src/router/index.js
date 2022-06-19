import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [// 路由位置
  {
    path: '/',
    name: 'layout',
    component: () => import('@/view/layout'),
    redirect: '/home',
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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/view/search')
  }, {
    path: '/articles/:articleId',
    name: "articles",
    component: () => import('@/view/article'),
    props: true
  },{
    path:'/editUserInfo',
    name:'editUserInfo',
    component:()=>import('@/view/editUserInfo'),
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
