<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-16 17:00:45
 * @Author: huangfengrui
 * @Date: 2020-01-09 17:55:41
 * @Description:
 -->
<template lang='pug'>
  Datatables(
    :isFilter="true"
    :filter-props="{namePlaceholder: '标题/作者'}"
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
import { commonDict } from '@/utils/relation'

@Component({
  components: {
    Datatables
  }
})
export default class List extends Vue {
  @Provide() title: string = '资讯管理'
  @Provide() resource: string = 'article'
  @Provide() tableList: string[] = ['title', 'categoryName', 'tags', 'author', 'digest', 'imageUrl', 'isPush', 'state', 'publishTime']
  @Provide() createList: string[] = ['title', 'categoryId', 'tags', 'author', 'digest', 'imageUrl', 'isPush', 'content']
  @Provide() filterList: string[] = []
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
      this.$commonApi.publishArticle(data).then((res: any) => {
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
      this.$commonApi.cancelArticle(data).then((res: any) => {
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
    authorCover: {
      label: '作者头像',
      form: {
        type: 'upload',
        rules: {
          required: true
        }
      }
    },
    author: {
      label: '作者',
      form: {
        type: 'input',
        rules: {
          required: true
        }
      }
    },
    digest: {
      label: '摘要',
      form: {
        type: 'input',
        formType: 'textarea',
        rows: 4,
        rules: [{
          required: true,
          message: '此选项必填'
        }, {
          max: 300,
          message: '不可超过300个字'
        }]
      }
    },
    categoryId: {
      label: '文章分类',
      align: 'center',
      relation: 'category',
      form: {
        type: 'select',
        rules: {
          required: true
        }
      }
    },
    categoryName: {
      label: '文章分类'
    },
    imageUrl: {
      label: '文章封面',
      align: 'center',
      render: {
        type: 'image'
      },
      form: {
        type: 'upload',
        rules: {
          required: true
        }
      }
    },
    isPush: {
      label: '是否推荐',
      align: 'center',
      render: {
        type: 'select',
        dict: commonDict.common
      },
      form: {
        type: 'switch',
        rules: {
          required: true
        }
      }
    },
    pageView: {
      label: '文章点击量'
    },
    publishTime: {
      label: '发布时间'
    },
    state: {
      label: '状态',
      align: 'center',
      render: {
        type: 'select',
        dict: commonDict.publishState
      }
    },
    tags: {
      label: '标签',
      form: {
        type: 'input',
        rules: {
          required: true
        }
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
    title: {
      label: '文章标题',
      form: {
        type: 'input',
        rules: [{
          required: true,
          message: '此选项必填'
        }, {
          max: 50,
          message: '不可超过50个字'
        }]
      }
    }
  }
}
</script>
