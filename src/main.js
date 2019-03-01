/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import CartContorl from './components/CartContorl/CartContorl.vue'
import store from './store'
import './mock/mockServer'  // mockServer.js会被打包执行一次

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartContorl', CartContorl)

new Vue({
  el: '#app',
  render: h => h(App),
  router, // 配置路由器
  store, // 配置vuex
})
