/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 09:59:57
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import request from '@/utils/api'
import { cloneDeep } from '../common'

export const operationUpdate = {
  label: '编辑',
  name: 'update',
  icon: 'edit',
  circle: true,
  type: 'primary',
  size: 'mini',
  tooltip: true,
  func: operationEventUpdate
}

export const operationDelete = {
  label: '删除',
  name: 'delete',
  icon: 'delete',
  circle: true,
  type: 'danger',
  size: 'mini',
  tooltip: true,
  func: operationEventDelete
}

export function operationEventUpdate ({ table, data }: any) {
  const labelName = table.labelName ? `【${data[table.labelName]}】` : ''
  table.dialogLabel = `编辑${table.label}${labelName}`
  table.dialogFormValues = cloneDeep(data)
  table.dialogFormList = table.updateList
  table.dialogButtonList = table.updateButtonList
  table.dialogVisible = true
}

export function operationEventDelete ({ table, data }: any) {
  table.$confirm('是否删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    request({
      url: `${table.resource}/delete/${data.id}`,
      method: 'post',
      data: {}
    }).then(() => {
      table.getData()
      table.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
  }).catch(() => {
  })
}
