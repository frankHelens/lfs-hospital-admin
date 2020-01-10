/*
 * @Author: 黄丰瑞 <huangfengrui@hqyatu.com>
 * @Date: 2019-08-02 16:00:10
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 13:59:07
 * @Description: 通用的方法
 */

import request from '@/utils/api'

/**
* funcName: 随机函数
* author: Frank
* @param {number} min 最小随机数
* @param {number} max 最大随机数
* @returns {number} 随机数
*/
export const randomFn = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * @description: 获取url的参数
 * @param {string} url 接口地址
 * @return {object} 所有参数对象
 */
export const getQueryVariable = (url: string) => {
  try {
    const query = url.split('?')[1]
    const paramsList = query.split('&')
    return paramsList.reduce((res: any, item: string) => {
      const params = item.split('=')
      res[params[0]] = params[1]
      return res
    }, {})
  } catch {
    return false
  }
}

/**
 * @description: 处理请求列表
 * @param {Array} list 请求接口的配置
 * @return {object} 接口调用配置
 */
export const setRequest = (list: any) => {
  return list.reduce((res: any, {
    method = 'get',
    funcName,
    url,
    afterFn,
    concatId = false,
    notKey = false }: any) => {
    res[funcName] = (data:any = {}) => request({
      url: concatId ? `/${url}/${data.id}` : `/${url}`,
      method,
      [method === 'get' ? 'params' : 'data']: !notKey ? {
        ...data
      } : data
    }).then((res: any) => afterFn ? afterFn(res) : res)
    return res
  }, {})
}

/**
* funcName: 自动注册路由方法
* author: Frank
* @param {string} name 路由名称
* @param {string} path 不填默认拿路由名称
* @param context: require.context(PATH, ACCURATE, AEG)
*** @param {string} PATH:  匹配的路径
*** @param {boolean} ACCURATE: 是否还应该匹配它的子目录
*** @param {age} AEG: 匹配文件的正则表达式(/\.vue$/)
*** 备注： 由于require.context无法使用动态参数，故放到配置项
* @param {Array} disableList: 配置关闭匹配组件名称
* @param {Array} extendChildrens: 扩展其他子路由
*** 备注： 除了index.vue外，默认匹配全部子组件，
* @param {object} routerViewPage: 路由命名视图（默认不开启）
*** 备注： 业务需要而提供的扩展,具体可看vue-router官网
* @returns {object} 路由
*/
class RouterAutomatic {
  init ({
    name,
    originName,
    path,
    context,
    routerViewPage = null,
    disableList = ['index'],
    extendChildren = [],
    option = {}
  }:any) {
    // 获取筛选完成之后的组件列表
    const componentList: any = this.setComponentList({
      originName,
      name,
      context,
      disableList
    })
    // getUrlFile(name, context)
    const childrens: any[] = routerViewPage
      ? [this.setRouterViewPage(routerViewPage, componentList), ...componentList]
      : componentList
    // 返回路由对象
    return {
      path: path || name,
      component: context('./index.vue').default,
      children: [
        ...childrens,
        ...extendChildren
      ],
      ...option
    }
  }
  // 设置命名视图
  setRouterViewPage (routerViewPage: any, componentList: any) {
    return {
      ...routerViewPage,
      components: componentList.reduce((res: any, { routerViewName, component }: any) => {
        res[routerViewName] = component
        return res
      }, {})
    }
  }
  // 过滤组件
  setComponentList ({ originName, name: parentsName, context, disableList }: any) {
    return context.keys().reduce((res: any, key: any) => {
      const componentItem = context(key).default
      const componentName = componentItem.name
      if (!disableList.includes(componentName)) {
        const name = this.handleToLowerCaseName(componentName)
        res.push({
          routerViewName: componentName,
          name: `${originName}${parentsName}${componentName}`,
          path: name,
          component: context(key).default
        })
      }
      return res
    }, [])
  }
  // 组件名称改驼峰名
  handleToLowerCaseName (name: string) {
    return name.replace(name[0], name[0].toLowerCase())
  }
}

export const routerAutomatic = new RouterAutomatic()

/**
 * @description: 本地存储封装
 */
export const storage = {
  get (key: any) {
    const value:any = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  set (key:any, value = '') {
    const postValue = JSON.stringify(value)
    window.sessionStorage.setItem(key, postValue)
  },
  clear () {
    window.sessionStorage.clear()
  }
}

/**
 * @description: 对象深拷贝
 * @param {object} 原对象
 * @return {object} 深拷贝后的对象
 */
export const cloneDeep = (val:object = {}) => JSON.parse(JSON.stringify(val))
