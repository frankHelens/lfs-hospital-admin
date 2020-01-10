/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 16:27:41
 * @Author: huangfengrui
 * @Date: 2020-01-10 16:26:05
 * @Description: 菜单
 */
export default [
  {
    icon: 'menu',
    name: 'banner',
    label: '广告管理',
    url: '/banner'
  },
  {
    icon: 'menu',
    name: 'hospital',
    label: '医院管理',
    url: '/hospital'
  },
  {
    icon: 'menu',
    name: 'reserve',
    label: '预约管理',
    url: '/reserve'
  },
  {
    icon: 'menu',
    name: 'information',
    label: '资讯管理',
    url: '/information',
    submenu: [{
      icon: 'menu',
      name: 'list',
      label: '资讯',
      url: '/information/list'
    }, {
      icon: 'menu',
      name: 'classify',
      label: '分类管理',
      url: '/information/classify'
    }]
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
