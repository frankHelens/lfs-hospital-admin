/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 18:03:27
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description: 请求接口拦截封装
 */
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { storage } from '@/utils/common'

const service = axios.create({
  // 设置超时时间
  timeout: 60000,
  // baseURL: process.env.BASE_URL
  baseURL: '/admin'
})

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use((config: any) => {
  const token = storage.get('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use((response:any) => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    if (response.data.code === 0) {
      return Promise.resolve(response.data.data)
    } else {
      if (response.data.code === 2) {
        Message({
          type: 'error',
          message: '登录超时'
        })
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        return false
      }
      Message({
        type: 'error',
        message: response.data.msg
      })
      return Promise.reject(response.data)
    }
  } else {
    return Promise.reject(response)
  }
}, (error: any) => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      // 跳转登录页
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      Message({
        type: 'error',
        message: '登录信息过期，请重新登录'
      })
      // 清除token
      localStorage.removeItem('token')
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    // 404请求不存在
    case 404:
      Message({
        message: '网络请求不存在',
        type: 'error'
      })
      break
    // 其他错误，直接抛出错误提示
    default:
      Message({
        message: error.response.data.message,
        type: 'error'
      })
  }
  return Promise.reject(error)
})

export default service