<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 18:10:53
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
    :operation="operationList"
    :operationWidth="160")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import { toolbarCreate } from '@/utils/buttons/toolbar'
import { operationUpdate, operationDelete } from '@/utils/buttons/operation'
import Datatables from '@/components/Datatables/index.vue'
import { bannerDict } from '@/utils/relation'

@Component({
  components: {
    Datatables
  }
})
export default class Banner extends Vue {
  @Provide() title: string = '广告管理'
  @Provide() resource: string = 'banner'
  @Provide() tableList: string[] = ['title', 'description', 'imageUrl', 'sort', 'state', 'publishTime', 'stopTime', 'pageView']
  @Provide() createList: string[] = ['title', 'description', 'imageUrl', 'sort', 'content']
  @Provide() updateList: string[] = []
  @Provide() filterList: string[] = ['state']
  @Provide() toolbarList: Object[] = [toolbarCreate]
  @Provide() operationList: Object[] = [{
    label: '发布',
    type: 'success',
    showFunc: (button:object, row:any) => {
      const { data } = row.funcProps
      return data.state === 0
    },
    func: ({ data, button, table }: any) => {
      button.loading = true
      this.$commonApi.publishBanner(data).then((res: any) => {
        button.loading = false
        this.$message({
          type: 'success',
          message: '发布成功'
        })
        table.getData()
      })
    }
  }, {
    label: '停止',
    type: 'danger',
    showFunc: (button:object, row:any) => {
      const { data } = row.funcProps
      return data.state === 1
    },
    func: ({ data, button, table }: any) => {
      button.loading = true
      this.$commonApi.cancelBanner(data).then((res: any) => {
        button.loading = false
        this.$message({
          type: 'success',
          message: '停止发布成功'
        })
        table.getData()
      })
    }
  }, operationUpdate, operationDelete]
  @Provide() columns: object = {
    description: {
      label: '描述',
      form: {
        type: 'input',
        formType: 'textarea',
        rows: 4,
        rules: [{
          required: true,
          message: '此选项必填'
        }, {
          max: 200,
          message: '不可超过200个字'
        }]
      }
    },
    content: {
      label: '内容',
      form: {
        type: 'richtext',
        rules: {
          required: true
        }
      }
    },
    imageUrl: {
      label: '图片地址',
      form: {
        type: 'upload',
        rules: {
          required: true
        }
      }
    },
    publishTime: {
      label: '发布时间'
    },
    sort: {
      label: '排序值',
      form: {
        type: 'number',
        rules: {
          required: true
        }
      }
    },
    state: {
      label: '状态',
      align: 'center',
      formatter: (row:object, column:object, val:string) => {
        return bannerDict.state[val]
      },
      form: {
        type: 'select',
        options: Object.entries(bannerDict.state).map(item => ({
          value: item[0],
          label: item[1]
        }))
      }
    },
    stopTime: {
      label: '停止时间'
    },
    title: {
      label: '标题',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    pageView: {
      label: '点击量',
      align: 'center'
    }
  }
}
</script>
