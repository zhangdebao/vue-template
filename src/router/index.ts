import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '内容管理',
      index: '1',
    },
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'tag',
        name: 'Tag',
        meta: {
          title: '标签管理',
        index: '1-1',
        },
        component: () => import('../views/tag/index.vue'),
        redirect: '/tag/list',
        children: [
          {
            path: 'tag',
            name: 'Tag',
            meta: {
              title: '列表',
              index: '1-1-1',
            },
            component: () => import('../views/tag/list.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
