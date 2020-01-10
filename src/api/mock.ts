/*
 * @Author: 黄丰瑞 <13433840491@hazra.com>
 * @Date: 2019-08-06 17:11:10
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 16:22:39
 * @Description: mock数据
 */

import Mock from 'mockjs'
import { getQueryVariable } from '@/utils/common'

class MockData {
  constructor () {
    Mock.setup({
      timeout: '200-800'
    })
  }
  commonData (data: object) {
    return {
      code: 0,
      data,
      message: 'success'
    }
  }
  getRelation (url: string) {
    return Mock.mock(RegExp(url + '.*'), /get/i, ({ url: fullUrl }: any) => {
      return this.commonData({
        enabled: [{
          label: '开启',
          value: true
        }, {
          label: '关闭',
          value: false
        }],
        sex: [{
          label: '男',
          value: 'man'
        }, {
          label: '女',
          value: 'woman'
        }, {
          label: '男',
          value: '未知'
        }]
      })
    })
  }
  getTableData (url: string) {
    return Mock.mock(RegExp(url + '.*'), /get/i, ({ url: fullUrl }: any) => {
      const { pageSize } = getQueryVariable(fullUrl)
      return Mock.mock(this.commonData({
        [`data|${pageSize}`]: [{
          'id': '@id',
          'user': '@email',
          'userName|1-10': '@character',
          'password': '@natural',
          'address': '@county(true)',
          'enabled': '@boolean',
          'createTime': '@now'
        }],
        total: 100
      }))
    })
  }
  postTableData (url: string) {
    return Mock.mock(RegExp(url + '.*'), /post/i, ({ url: fullUrl, body }: any) => {
      return Mock.mock(this.commonData({}))
    })
  }
  putTableData (url: string) {
    return Mock.mock(RegExp(url + '/.*' + '.*'), /put/i, ({ url: fullUrl, body }: any) => {
      return Mock.mock(this.commonData({}))
    })
  }
}

const mockData = new MockData()
mockData.getTableData('/table/list')
mockData.postTableData('/table/list')
mockData.putTableData('/table/list')
mockData.getRelation('/relation')
