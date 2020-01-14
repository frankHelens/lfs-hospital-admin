/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 18:08:42
 * @Author: huangfengrui
 * @Date: 2020-01-10 16:26:05
 * @Description: 菜单
 */
export default [
  {
    icon: 'document',
    name: 'banner',
    label: '广告管理',
    url: '/banner'
  },
  {
    icon: 's-home',
    name: 'hospital',
    label: '医院管理',
    url: '/hospital'
  },
  {
    icon: 'phone',
    name: 'reserve',
    label: '预约管理',
    url: '/reserve'
  },
  {
    icon: 's-order',
    name: 'information',
    label: '资讯管理',
    url: '/information',
    submenu: [{
      icon: 's-order',
      name: 'list',
      label: '资讯',
      url: '/information/list'
    }, {
      icon: 'notebook-2',
      name: 'classify',
      label: '分类管理',
      url: '/information/classify'
    }]
  },
  {
    icon: 'user',
    name: 'user',
    label: '员工管理',
    url: '/user'
  }
  // {
  //   icon: 'menu',
  //   name: 'dashboard',
  //   label: '首页',
  //   url: '/dashboard'
  // },
  // {
  //   icon: 'menu',
  //   name: 'formPage',
  //   label: '表单',
  //   url: '/formPage'
  // },
  // {
  //   icon: 'menu',
  //   name: 'datatablePage',
  //   label: '表格',
  //   url: '/datatablePage'
  // },
  // {
  //   icon: 'menu',
  //   name: 'buttonListPage',
  //   label: '按钮组',
  //   url: '/buttonListPage'
  // }
]
