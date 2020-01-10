/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 14:00:46
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
/*
* url: 接口地址
* funcName: 调用接口方法名(不填默认拿接口地址作为方法名)
* remark: 备注
* 使用：
** this.$dataManageApi.{funcName}(option).then(res => {})
** option：请求参数
*/

export default [{
  url: 'reserve/update',
  method: 'post',
  concatId: true,
  funcName: 'therapy',
  remark: '数据管理接口',
  afterFn (data: any) {
    return data
  }
}, {
  url: 'dataGraphical',
  funcName: 'getDataGraphical',
  remark: '图形管理接口',
  afterFn (data: any) {
    // 添加legendData
    const resultData = data.data.map((item: any) => {
      item['legendData'] = item.nameitem.map((subItem: any) => subItem.name)
      item.nameitem.map((subItem: any) => {
        subItem['percentage'] = (subItem.value / item.total).toFixed(2)
      })
      return item
    })
    return resultData
  }
}]
