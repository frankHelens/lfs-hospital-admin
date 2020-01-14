/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 15:37:54
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
  remark: '就诊',
  afterFn (data: any) {
    return data
  }
}, {
  url: 'banner/active',
  method: 'post',
  concatId: true,
  funcName: 'publishBanner',
  remark: '发布banner'
}, {
  url: 'banner/cancel',
  method: 'post',
  concatId: true,
  funcName: 'cancelBanner',
  remark: '发布banner'
}, {
  url: 'article/active',
  method: 'post',
  concatId: true,
  funcName: 'publishArticle',
  remark: '发布资讯'
}, {
  url: 'article/cancel',
  method: 'post',
  concatId: true,
  funcName: 'cancelArticle',
  remark: '发布资讯'
}]
