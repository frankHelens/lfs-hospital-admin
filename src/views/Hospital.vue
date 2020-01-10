<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 18:21:44
 * @Author: huangfengrui
 * @Date: 2020-01-09 17:55:41
 * @Description:
 -->
<template lang='pug'>
  Datatables(
    label="账号"
    labelName="userName"
    :resource="resource"
    :columns="columns"
    :tableList="tableList"
    :toolbar="toolbarList"
    :filterList="filterList"
    :createList="createList"
    :operation="operationList")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import { toolbarCreate, toolbarRefresh } from '@/utils/buttons/toolbar'
import { operationUpdate, operationDelete } from '@/utils/buttons/operation'
import Datatables from '@/components/Datatables/index.vue'
import request from '@/utils/api'

@Component({
  components: {
    Datatables
  }
})
export default class Hospital extends Vue {
  @Provide() title: string = '医院管理'
  @Provide() resource: string = 'hospital'
  @Provide() tableList: string[] = ['name', 'address', 'phone']
  @Provide() createList: string[] = ['name', 'address', 'phone']
  @Provide() updateList: string[] = ['name', 'address', 'phone']
  @Provide() filterList: string[] = []
  @Provide() toolbarList: Object[] = [toolbarCreate, toolbarRefresh]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete]
  @Provide() columns: object = {
    name: {
      label: '医院名称',
      form: {
        type: 'input'
      }
    },
    address: {
      label: '医院地址',
      form: {
        type: 'input'
      }
    },
    phone: {
      label: '医院电话',
      form: {
        type: 'input'
      }
    }
  }
  @Provide() tableData: object[] = []
  created (): void {
    this.getData()
  }
  getData (): void {
    request({
      url: '/table/list',
      params: {
        pageSize: '20',
        pageIndex: '1'
      }
    }).then((res: any) => {
      this.tableData = res.data.data
    })
  }
}
</script>
