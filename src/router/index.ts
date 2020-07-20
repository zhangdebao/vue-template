import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    title: '内容管理',
    index: '1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: 'tag',
        name: 'Tag',
        title: '标签管理',
        index: '1-1',
        component: () => import(/* webpackChunkName: "about" */ '../views/tag/index.vue'),
        redirect: '/tag/list',
        children: [
          {
            path: 'tag',
            name: 'Tag',
            title: '列表',
            index: '1-1-1',
            component: () => import(/* webpackChunkName: "about" */ '../views/tag/list.vue')
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
