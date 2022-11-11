import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login', // 登录页
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home', // 布局页
    name: 'home',
    component: () => import('../views/home/index.vue'),
    // 配置子路由
    children:[
      {
          path: '/index', // 首页
          name: 'index',
          component: () => import('../views/home/index/index.vue')
      },
      {
          path: '/stats',
          name: 'stats',
          component: () => import('../views/home/stats/index.vue')
      },
      {
          path: '/wms',
          name: 'wms',
          component: () => import('../views/home/wms/index.vue'),
          children: [
              {
                  path: '/wms/list',
                  name: 'wmsList',
                  component: () => import('../views/home/wms/list.vue')
              }
          ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
