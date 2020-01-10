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
export default class BeforeAudit extends Vue {
  @Provide() title: string = '账号管理'
  @Provide() resource: string = 'article'
  @Provide() tableList: string[] = ['user', 'userName', 'password', 'address', 'enabled', 'sex', 'createTime']
  @Provide() createList: string[] = ['user', 'userName', 'password', 'enabled', 'sex']
  @Provide() updateList: string[] = ['user', 'userName', 'password', 'enabled', 'sex']
  @Provide() filterList: string[] = ['user', 'sex']
  @Provide() toolbarList: Object[] = [toolbarCreate, toolbarRefresh, { label: '自定义按钮',
    func (data: object) {
      console.log(data)
    }
  }]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete, {
    label: '自定义按钮',
    icon: 'eye',
    type: 'success',
    func ({ button, data }: any) {
      console.log(data)
      button.loading = true
      setTimeout(() => {
        button.loading = false
      }, 2000)
    }
  }]
  @Provide() columns: object = {
    user: {
      label: '账号',
      create: true,
      update: true,
      filterType: 'eq',
      form: {
        type: 'input'
      }
    },
    userName: {
      label: '账号名',
      create: true,
      update: true,
      render: (data: string) => {
        return `${data}元`
      },
      form: {
        type: 'input',
        size: 'medium'
      }
    },
    password: {
      label: '密码',
      form: {
        type: 'input',
        showPassword: true
      }
    },
    address: {
      label: '地址',
      create: true,
      update: true
    },
    enabled: {
      label: '启用状态',
      type: 'select',
      relation: 'enabled',
      create: true,
      update: true,
      formatter: ({ enabled }: any) => {
        return enabled ? '启用' : '不启用'
      },
      form: {
        type: 'switch'
      }
    },
    sex: {
      label: '性别',
      type: 'select',
      relation: 'sex',
      render: {
        type: 'select'
      },
      formatter: (data: any) => {
        return '男'
      },
      form: {
        type: 'select'
      }
    },
    createTime: {
      label: '创建时间',
      render: {
        format: 'YYYY-MM-DD HH:ss:mm',
        type: 'datetime'
      },
      create: {
        type: 'daterange'
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
