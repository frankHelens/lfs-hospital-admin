<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 15:18:46
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description: Datatable
 -->
<template lang='pug'>
el-table.table(
  v-loading="isLoading"
  style="width: 100%"
  border
  stripe
  size="medium"
  header-row-class-name="table-header"
  :data="currentTableData"
  :height="tableClientHeight")
  el-table-column(type="index" width="50" label="序号")
  el-table-column(
    v-for="(key, i) in tableList"
    v-if="Object.keys(columns).length"
    :key="key"
    :prop="key"
    :column-key="key"
    :label="columns[key].label"
    :fixed="columns[key].fixed"
    :align="columns[key].align"
    :min-width="columns[key].width"
    :formatter="columns[key].formatter"
    :show-overflow-tooltip="true")
  el-table-column(
    v-if="Object.keys(columns).length && hasOperation"
    :label="operationOption.label"
    :fixed="operationOption.fixed"
    :width="operationOption.width")
    template(slot-scope="scope")
      ButtonList(:buttonList="operationList | setOperationList(scope.row)")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop, PropSync } from 'vue-property-decorator'
import ButtonList from '@/components/ButtonList/index.vue'

@Component({
  components: {
    ButtonList
  },
  filters: {
    setOperationList (operationList: object[], data: object) {
      return operationList.reduce((res: any, operation: any) => {
        if (!operation.isShow || operation.isShow(data, operation)) {
          res.push({
            ...operation,
            size: 'mini',
            funcProps: {
              ...operation.funcProps,
              data
            }
          })
        }
        return res
      }, [])
    }
  }
})
export default class Datatable extends Vue {
  @PropSync('loading', { type: Boolean }) isLoading!: boolean
  @PropSync('tableData', { type: Array }) currentTableData!: object[]
  @PropSync('tableHeight', { type: Number }) tableClientHeight!: number

  @Prop({ type: Array }) operationList!: object[]
  @Prop({ type: Array }) tableList!: string[]
  @Prop({ type: Object }) columns!: object
  @Prop({ type: Number }) operationWidth!: number

  get hasOperation () {
    return this.operationList && this.operationList.length
  }
  get operationOption () {
    return {
      name: 'operation',
      label: '操作栏',
      width: this.operationWidth
    }
  }
}
</script>
