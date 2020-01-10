<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 17:04:27
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
import { bannerDict } from '@/utils/relation'

@Component({
  components: {
    Datatables
  }
})
export default class Banner extends Vue {
  @Provide() title: string = '广告管理'
  @Provide() resource: string = 'banner'
  @Provide() tableList: string[] = ['title', 'content', 'imageUrl', 'sort', 'state', 'publishTime', 'stopTime', 'pageView']
  @Provide() createList: string[] = []
  @Provide() updateList: string[] = []
  @Provide() filterList: string[] = ['state']
  @Provide() toolbarList: Object[] = [toolbarCreate]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete]
  @Provide() columns: object = {
    content: {
      label: '描述'
    },
    imageUrl: {
      label: '图片地址'
    },
    publishTime: {
      label: '发布时间'
    },
    sort: {
      label: '排序值'
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
      label: '标题'
    },
    pageView: {
      label: '点击量',
      align: 'center'
    }
  }
}
</script>
