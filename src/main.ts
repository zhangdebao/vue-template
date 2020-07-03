// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { router } from '@/preset/router.ts'
import App from '@/views/App.vue'
import 'element-ui/lib/theme-chalk/index.css'
// import store from '@/preset/store.js'
Vue.use(VueRouter)
/* eslint-disable */
new Vue({
  el: '#root',
  router,
  // store,
  render: h => h(App)
})
