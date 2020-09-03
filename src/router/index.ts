import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '技术尝试',
      index: '1',
      role: 'admin'
    },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'cache',
        name: 'Cache',
        meta: {
          title: '缓存机制',
          index: '1-1',
          role: 'admin'
        },
        component: () => import('../views/cache/index.vue'),
        redirect: '/cache/consult',
        children: [
          {
            path: 'consult',
            name: 'Consult',
            meta: {
              title: '协商缓存',
              index: '1-1-1',
              role: 'admin'
            },
            component: () => import('../views/cache/consult.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
