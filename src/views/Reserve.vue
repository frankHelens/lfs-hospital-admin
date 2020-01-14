<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-13 15:34:02
 * @Author: huangfengrui
 * @Date: 2020-01-09 17:55:41
 * @Description:
 -->
<template lang='pug'>
  Datatables(
    :isFilter="true"
    :resource="resource"
    :columns="columns"
    :tableList="tableList"
    :filterList="filterList"
    :operation="operationList")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import { toolbarCreate } from '@/utils/buttons/toolbar'
import { operationUpdate, operationDelete } from '@/utils/buttons/operation'
import Datatables from '@/components/Datatables/index.vue'
import { reserveDict } from '@/utils/relation'

@Component({
  components: {
    Datatables
  }
})
export default class Reserve extends Vue {
  @Provide() title: string = '预约管理'
  @Provide() resource: string = 'reserve'
  @Provide() tableList: string[] = ['name', 'phone', 'email', 'diagType', 'hospitalName', 'hospitalPhone', 'hospitalAddress', 'selectTime', 'state']
  @Provide() createList: string[] = ['name', 'phone', 'address']
  @Provide() filterList: string[] = ['hospitalId']
  @Provide() toolbarList: Object[] = []
  @Provide() operationList: Object[] = [{
    label: '就诊',
    type: 'primary',
    icon: 'eye',
    showFunc: (button:object, row:any) => {
      const { funcProps } = row
      const { data } = funcProps
      const { state } = data
      return state === 0
    },
    func: ({ button, data, table }: any) => {
      button.loading = true
      this.$commonApi.therapy(data).then(() => {
        button.loading = false
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        table.getData()
      })
    }
  }]
  @Provide() columns: object = {
    diagType: {
      label: '预约类型',
      width: 80,
      align: 'center',
      formatter: (row: any, columns: any, val: any) => {
        return reserveDict.diagType[val]
      }
    },
    email: {
      label: '预约邮箱',
      width: 150
    },
    hospitalAddress: {
      label: '医院地址',
      width: 200
    },
    hospitalName: {
      label: '医院名称',
      width: 120
    },
    hospitalId: {
      label: '医院名称',
      relation: 'hospital',
      form: {
        type: 'select'
      }
    },
    hospitalPhone: {
      label: '医院电话',
      width: 120
    },
    name: {
      label: '预约姓名',
      width: 80
    },
    phone: {
      label: '预约电话',
      width: 120
    },
    selectTime: {
      label: '预约时间',
      width: 150
    },
    state: {
      label: '就诊状态',
      align: 'center',
      formatter: (row: any, columns: any, val: any) => {
        return reserveDict.state[val]
      }
    }
  }
}
</script>
