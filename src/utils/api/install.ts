/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 13:49:38
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import { setRequest } from '@/utils/common'

import commonApi from './common'
import systemApi from './system'
export default {
  install (Vue: any) {
    Vue.prototype.$commonApi = setRequest(commonApi)
    Vue.prototype.$systemApi = setRequest(systemApi)
  }
}
