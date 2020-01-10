<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 14:56:29
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
export default class List extends Vue {
  @Provide() title: string = '资讯管理'
  @Provide() resource: string = 'article'
  @Provide() tableList: string[] = ['title', 'categoryName', 'author', 'isPush', 'state', 'publishTime']
  @Provide() createList: string[] = []
  @Provide() updateList: string[] = []
  @Provide() filterList: string[] = []
  @Provide() toolbarList: Object[] = [toolbarCreate]
  @Provide() operationList: Object[] = [operationUpdate, operationDelete]
  @Provide() columns: object = {
    author: {
      label: '作者'
    },
    categoryId: {
      label: '文章分类id'
    },
    categoryName: {
      label: '文章类别',
      align: 'center'
    },
    content: {
      label: '文章内容'
    },
    digest: {
      label: '文章摘要'
    },
    imageUrl: {
      label: '文章封面'
    },
    isPush: {
      label: '是否推荐'
    },
    pageView: {
      label: '文章点击量'
    },
    publishTime: {
      label: '发布时间'
    },
    state: {
      label: '状态'
    },
    tags: {
      label: '文章标签'
    },
    title: {
      label: '文章标题'
    }
  }
}
</script>
