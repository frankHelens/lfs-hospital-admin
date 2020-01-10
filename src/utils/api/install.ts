/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 17:12:57
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import { setRequest } from '@/utils/common'

import informationApi from './information'
import systemApi from './system'
export default {
  install (Vue: any) {
    Vue.prototype.$informationApi = setRequest(informationApi)
    Vue.prototype.$systemApi = setRequest(systemApi)
  }
}
