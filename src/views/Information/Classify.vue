<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 14:41:54
 * @Author: huangfengrui
 * @Date: 2020-01-09 17:55:41
 * @Description:
 -->
<template lang='pug'>
  Datatables(
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
import { toolbarCreate } from '@/utils/buttons/toolbar'
import { operationUpdate, operationDelete } from '@/utils/buttons/operation'
import Datatables from '@/components/Datatables/index.vue'
import dayjs from 'dayjs'

@Component({
  components: {
    Datatables
  }
})
export default class Classify extends Vue {
  @Provide() title: string = '分类管理'
  @Provide() resource: string = 'category'
  @Provide() tableList: string[] = ['name', 'createTime']
  @Provide() createList: string[] = ['name']
  @Provide() updateList: string[] = ['name']
  @Provide() filterList: string[] = []
  @Provide() toolbarList: Object[] = [toolbarCreate]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete]
  @Provide() columns: object = {
    name: {
      label: '类别',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    createTime: {
      label: '添加时间',
      formatter: (row:any, columns:any, val: any) => {
        return dayjs(val).format('YYYY-MM-DD HH:mm')
      },
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    }
  }
}
</script>
