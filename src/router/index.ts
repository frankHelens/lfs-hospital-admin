/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-13 14:01:11
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const routerContext = require.context('./', true, /\.ts$/)
const routes = routerContext.keys().reduce((resRoute: any, route: any) => {
  // 如果是根目录，不处理
  if (!route.startsWith('./index.ts')) {
    const routerModule = routerContext(route)
    resRoute.push({
      // beforeEnter: routerBeforeEnter,
      ...routerModule.default
    })
  }
  return resRoute
}, [])

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        ...routes,
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue')
        }, {
          path: 'formPage',
          name: 'formPage',
          component: () => import(/* webpackChunkName: "page" */ '@/views/FormPage.vue')
        }, {
          path: 'datatablePage',
          name: 'datatablePage',
          component: () => import(/* webpackChunkName: "page" */ '@/views/DatatablePage.vue')
        }, {
          path: 'buttonListPage',
          name: 'buttonListPage',
          component: () => import(/* webpackChunkName: "page" */ '@/views/ButtonListPage.vue')
        }, {
          path: '/changePassword',
          name: 'changePassword',
          component: () => import(/* webpackChunkName: "changePassword" */ '@/views/ChangePassword.vue')
        }, {
          path: '/hospital',
          name: 'hospital',
          component: () => import(/* webpackChunkName: "hospital" */ '@/views/Hospital.vue')
        }, {
          path: '/reserve',
          name: 'reserve',
          component: () => import(/* webpackChunkName: "reserve" */ '@/views/Reserve.vue')
        }, {
          path: '/banner',
          name: 'banner',
          component: () => import(/* webpackChunkName: "banner" */ '@/views/Banner.vue')
        }, {
          path: '/user',
          name: 'user',
          component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
    }
  ]
})
