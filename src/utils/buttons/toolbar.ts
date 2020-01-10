/*
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 09:33:38
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 */
import { cloneDeep } from '@/utils/common'

export const toolbarCreate = {
  label: '新增',
  name: 'create',
  icon: 'plus',
  type: 'primary',
  func: toolbarEventCreate
}

// export const toolbarBack = {
//   label: '返回',
//   name: 'back',
//   icon: 'angle-left',
//   func: toolbarEventBack
// }

export const toolbarRefresh = {
  label: '刷新',
  name: 'refresh',
  icon: 'refresh',
  func: toolbarEventRefresh
}

// export const toolbarPrint = {
//   label: '打印',
//   name: 'print',
//   icon: 'print',
//   func: toolbarPrintEvent
// }

// export const toolbarExport = {
//   label: '导出',
//   name: 'export',
//   icon: 'export',
//   func: toolbarExportEvent
// }

export function toolbarEventCreate ({ table }: any) {
  table.dialogLabel = '新增' + table.label
  table.dialogFormValues = cloneDeep(table.createFormValues)
  // table.dialogFormValues = table.createFormValues
  table.dialogFormList = table.createList
  table.dialogButtonList = table.createButtonList
  table.dialogVisible = true
}

// export function toolbarEventBack ({funcProps}) {
//   const { table } = funcProps
//   table.$router.go(-1)
// }

export function toolbarEventRefresh ({ table }: any) {
  table.getData()
}

// export function toolbarPrintEvent ({funcProps}) {
//   const { table } = funcProps
//   table.$refs.print.printEvent()
// }

// export function toolbarExportEvent ({funcProps}) {
//   const { table } = funcProps
//   table.$swal({
//     title: '提示',
//     text: '是否导出数据?',
//     type: 'question',
//     showCancelButton: true,
//     focusConfirm: false,
//     buttonsStyling: false,
//     confirmButtonClass: 'btn btn-complete',
//     cancelButtonClass: 'btn btn-default',
//     confirmButtonText: '导出',
//     cancelButtonText: '取消'
//   }).then((result) => {
//     if (table.isAll) {
//       // table.$loading()
//       table.$get({
//         url: table.resource,
//         params: {
//           filterBy: table.filterByToFilterText({...table.filterBy, ...table.filterByAlways}),
//           pageSize: 99999999,
//           pageIndex: 1
//         }
//       }).then((data) => {
//         table.exportData = data.data
//         // table.$loading.end()
//         setTimeout(() => {
//           table.$refs.export.exportEvent()
//         }, 100)
//       })
//     } else {
//       table.exportData = table.tableData
//       setTimeout(() => {
//         table.$refs.export.exportEvent()
//       }, 100)
//     }
//   }, (dismiss) => {})
// }
