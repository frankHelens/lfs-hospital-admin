/*
 * @Author: 黄丰瑞 <huangfengrui@hqyatu.com>
 * @Date: 2019-08-26 09:55:41
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 14:29:01
 * @Description: 资讯管理
 */
import { routerAutomatic } from '@/utils/common'

export default routerAutomatic.init({
  name: 'information',
  context: require.context('@/views/Information', false, /\.vue$/),
  option: {
    redirect: '/information/list'
  }
})
