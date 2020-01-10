<template lang="pug">
.wrapper
  el-card
    .toolbar(slot="header")
      ButtonList(
        v-if="toolbarList && toolbarList.length"
        :buttonList="toolbarList")
      .search-wrapper
        SmartForm(
          v-if="hasRelation"
          :inline="true"
          :columns="columnsList"
          :formList="filterList"
          :buttonList="filterButtonList")
    Datatable(
      :loading="loading"
      :tableList="tableList"
      :columns="columnsList"
      :tableData="currentTableData"
      :tableHeight="tableClientHeight"
      :operationList="operationList"
      :operationWidth="operationWidth")
    .footer
      Pagination(
        :total="total"
        @handleChange="onPaginationChange")
  el-dialog(
    :close-on-click-modal="false"
    :title="dialogLabel"
    :visible.sync="dialogVisible")
    SmartForm(
      v-if="hasRelation"
      :values="dialogFormValues"
      :formList="createList"
      :columns="columnsList"
      :buttonList="dialogButtonList")
</template>

<script lang="ts">
import { Vue, Provide, Component, Prop, Watch } from 'vue-property-decorator'
import { Component as tsc } from 'vue-tsx-support'
import ButtonList from '@/components/ButtonList/index.vue'
import Datatable from './Datatable.vue'
import Pagination from './Pagination.vue'
import SmartForm from '@/components/SmartForm/index.vue'
import request from '@/utils/api'

interface DatatablesProps {
  label?: string
  labelName?: string
  resource?: string
  columns?: object
  tableData?: object[]
  operationWidth?: number
  tableList?: string[]
  filterList?: string[]
  createList?: string[]
  updateList?: string[]
  toolbar?: object[]
  operation?: object[]
  createFormValues?: object
  updateFormValues?: object
}

@Component({
  components: {
    ButtonList,
    Datatable,
    SmartForm,
    Pagination
  }
})

export default class Datatables extends tsc<DatatablesProps> {
// export default class Datatables extends Vue {
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) labelName!: string
  @Prop({ default: '' }) resource!: string
  @Prop({ default: () => ({}), required: true }) columns!: object
  @Prop({ default: () => [] }) tableData!: object[]
  @Prop({ default: 100 }) operationWidth!: number
  @Prop({ default: () => [] }) tableList!: string[]
  @Prop({ default: () => [] }) filterList!: string[]
  @Prop({ default: () => [] }) createList!: string[]
  @Prop({ default: () => [] }) updateList!: string[]
  @Prop({ default: () => [] }) toolbar!: object[]
  @Prop({ default: () => [] }) operation!: object[]
  @Prop({ default: () => ({}) }) createFormValues!: object
  @Prop({ default: () => ({}) }) updateFormValues!: object

  @Provide() hasRelation: boolean = false
  @Provide() pageSize: string|number = 10
  @Provide() pageIndex: string|number = 1
  @Provide() currentTableData: object[] = []
  @Provide() total: number = 0
  @Provide() loading: boolean = false
  @Provide() columnsList: any = {}
  @Provide() filterBy: string = ''
  @Provide() filterButtonList: object[] = [{
    label: '搜索',
    func: ({ data }: any) => {
      this.onFilterChange(data)
    }
  }]
  @Provide() dialogVisible: boolean = false
  @Provide() dialogLabel: string = ''
  @Provide() dialogFormValues: object = {}
  @Provide() dialogButtonList: object[] = []
  @Provide() createButtonList: object[] = [{
    label: '提交',
    func: (props: object) => {
      this.onCreateSubmit(props)
    }
  }]
  @Provide() updateButtonList: object[] = [{
    label: '提交',
    func: (props: object) => {
      this.onUpdateSubmit(props)
    }
  }]
  created ():void {
    this.getRelation()
    this.getData()
  }

  get tableClientHeight (): number {
    return document.body.clientHeight - 354
  }
  get toolbarList () {
    return this.toolbar.reduce((res: any, toolbar: any) => {
      if (toolbar.isShow === undefined || toolbar.isShow === true || toolbar.isShow(toolbar)) {
        res.push({
          ...toolbar,
          funcProps: {
            ...toolbar.funcProps,
            table: this
          }
        })
      }
      return res
    }, [])
  }
  get operationList () {
    return this.operation.map((item: any) => ({
      ...item,
      size: 'mini',
      funcProps: {
        ...item.funcProps,
        table: this
      }
    }))
  }
  async getRelation () {
    const relation = this.getRelationList(this.columns)
    const data = await request({
      url: 'relation',
      params: {
        relation
      }
    })
    this.setRelationList(this.columns, data)
    this.hasRelation = true
  }
  async getData () {
    if (this.resource) {
      this.loading = true
      const data = await request({
        url: `${this.resource}/list`,
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageIndex
        }
      })
      this.currentTableData = data.records
      this.total = data.total
      this.loading = false
    } else {
      this.currentTableData = this.tableData
    }
  }
  getRelationList (columns: any): string {
    const columnsList = Object.keys(columns).reduce((res: string[], item: string) => {
      if (columns[item].relation) {
        res.push(columns[item].relation)
      }
      return res
    }, [])
    return columnsList.join(',')
  }
  setRelationList (columns: any, relationData: any): void {
    const columnsList = Object.keys(columns).reduce((res: any, item: string) => {
      const relationKey = columns[item].relation
      res[item] = columns[item]
      if (relationKey) {
        res[item]['options'] = relationData[relationKey]
      }
      return res
    }, {})
    this.columnsList = columnsList
  }
  onPaginationChange ({ pageIndex, pageSize }:any) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.getData()
  }
  onFilterChange (data: any) {
    this.filterBy = Object.keys(data).reduce((res: any, item:any) => {
      if (data[item]) {
        res.push({
          name: item,
          type: this.columnsList[item].filterType || 'eq',
          value: data[item]
        })
      }
      return res
    }, []).map(({ name, type, value }: any) => `${name}|${type}|${value}`).join(';')
    console.log(this.filterBy)
    this.getData()
  }
  onCreateSubmit ({ data, button }: any) {
    button.loading = true
    request({
      url: `${this.resource}/save`,
      method: 'post',
      data
    }).then(() => {
      button.loading = false
      this.dialogVisible = false
      this.dialogFormValues = this.createFormValues
      this.getData()
    }).catch(() => {
      button.loading = false
    })
  }
  onUpdateSubmit ({ data, button }: any) {
    button.loading = true
    request({
      url: `${this.resource}/update`,
      method: 'post',
      data
    }).then(() => {
      button.loading = false
      this.dialogVisible = false
      this.getData()
    }).catch(() => {
      button.loading = false
    })
  }
}
</script>

<style lang="scss">
.wrapper {
  .toolbar {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-wrapper {
      display: flex;
      // flex: 1;
      justify-content: flex-end;
    }
  }
  .footer {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
