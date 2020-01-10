/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 14:50:52
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description: m
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.scss'
import EventBus from 'vue-bus-ts'
import apiInstall from '@/utils/api/install'
import 'vue-tsx-support/enable-check'

Vue.use(EventBus)
Vue.use(ElementUI)
Vue.use(apiInstall)

if (process.env.NODE_ENV === 'development') {
  require('@/api/mock.ts')
}

Vue.config.productionTip = false
var bus = new EventBus.Bus()

new Vue({
  bus,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
