/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 17:07:42
 * @Author: huangfengrui
 * @Date: 2020-01-09 16:31:00
 * @Description:
 */
/*
* url: 接口地址
* funcName: 调用接口方法名(不填默认拿接口地址作为方法名)
* methd: 请求类型
* remark: 备注
* 使用：
** this.$dataManageApi.{funcName}(option).then(res => {})
** option：请求参数
*/
export default [{
  url: 'login',
  funcName: 'login',
  method: 'post',
  remark: '登录接口',
  afterFn (data: any) {
    return data
  }
}]
