// main.js
import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
/* eslint-disable */
new Vue({
  el: '#root',
  router,
  store,
  // store,
  render: h => h(App)
})
