<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-13 15:21:46
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

@Component({
  components: {
    Datatables
  }
})
export default class Hospital extends Vue {
  @Provide() title: string = '医院管理'
  @Provide() resource: string = 'hospital'
  @Provide() tableList: string[] = ['name', 'phone', 'address']
  @Provide() createList: string[] = ['name', 'phone', 'address']
  @Provide() updateList: string[] = ['name', 'phone', 'address']
  @Provide() filterList: string[] = []
  @Provide() toolbarList: Object[] = [toolbarCreate]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete]
  @Provide() columns: object = {
    name: {
      label: '医院名称',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    address: {
      label: '医院地址',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    phone: {
      label: '医院电话',
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
