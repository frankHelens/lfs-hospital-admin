<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 17:58:48
 * @Author: huangfengrui
 * @Date: 2020-01-09 17:55:41
 * @Description:
 -->
<template lang='pug'>
  Datatables(
    :resource="resource"
    :columns="columns"
    :createList="createList"
    :toolbar="toolbarList"
    :tableList="tableList"
    :operation="operationList")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import Datatables from '@/components/Datatables/index.vue'
import { toolbarCreate } from '@/utils/buttons/toolbar'
import { operationDelete } from '../utils/buttons/operation'

@Component({
  components: {
    Datatables
  }
})
export default class Hospital extends Vue {
  @Provide() title: string = '员工管理'
  @Provide() resource: string = 'user'
  @Provide() tableList: string[] = ['name', 'phone', 'username']
  @Provide() createList: string[] = ['username', 'password', 'name', 'phone']
  @Provide() toolbarList: object[] = [toolbarCreate]
  @Provide() operationList: object[] = [operationDelete]

  @Provide() columns: object = {
    name: {
      label: '员工名称',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    username: {
      label: '账号名称',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    phone: {
      label: '电话',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    password: {
      label: '密码',
      form: {
        type: 'password',
        rules: {
          required: true
        }
      }
    }
  }
}
</script>
