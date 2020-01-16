<template lang="pug">
.wrapper
  el-card
    .toolbar(slot="header")
      ButtonList(
        v-if="toolbarList && toolbarList.length"
        :buttonList="toolbarList")
      .search-wrapper
        FilterBox(
          v-if="isFilter"
          ref="filterBox"
          v-bind="filterProps"
          v-model="filterFormValues")
        SmartForm(
          ref="customFilterForm"
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
      template(slot-scope="{content, prop}" v-if="content.render")
        el-table-column(
          :fixed="content.fixed"
          :align="content.align"
          :min-width="content.width"
          :label="content.label")
          template(
            slot-scope="{row, $index}")
            InfoRender(
              :name="prop"
              :data="row[prop]"
              :row="row"
              :index="$index"
              :render="content.render")
    .footer
      Pagination(
        :total="total"
        @handleChange="onPaginationChange")
  el-dialog(
    :width="dialogWidth"
    :close-on-click-modal="false"
    :title="dialogLabel"
    :visible.sync="dialogVisible")
    SmartForm(
      v-if="dialogVisible && hasRelation"
      ref="smartForm"
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
import InfoRender from './InfoRender.vue'
import SmartForm from '@/components/SmartForm/index.vue'
import FilterBox from '@/components/FilterBox.vue'
import dayjs from 'dayjs'
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
  isFilter?: boolean
  filterProps?: object
}

@Component({
  components: {
    ButtonList,
    Datatable,
    SmartForm,
    Pagination,
    FilterBox,
    InfoRender
  }
})

export default class Datatables extends tsc<DatatablesProps> {
  public $refs!: {
    filterBox: FilterBox,
    customFilterForm: SmartForm
  }
  // export default class Datatables extends Vue {
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) labelName!: string
  @Prop({ default: '' }) resource!: string
  @Prop({ default: () => ({}), required: true }) columns!: object
  @Prop({ default: () => [] }) tableData!: object[]
  @Prop({ default: 100 }) operationWidth!: number
  @Prop({ default: false }) isFilter!: boolean
  @Prop({ default: () => ({}) }) filterProps!: object
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
  @Provide() filterFormValues: object = {}
  @Provide() customFilterValues: object = {}
  @Provide() filterButtonList: object[] = this.isFilter || this.filterList.length ? [{
    label: '搜索',
    type: 'primary',
    func: ({ data }: any) => {
      this.handleOnSearch(data)
    }
  }, {
    label: '重置',
    func: ({ data }: any) => {
      this.handleOnReset(data)
    }
  }] : []
  @Provide() dialogWidth: string = '40%'
  @Provide() dialogVisible: boolean = false
  @Provide() dialogLabel: string = ''
  @Provide() dialogFormValues: object = {}
  @Provide() dialogButtonList: object[] = []
  @Provide() createButtonList: object[] = [{
    label: '提交',
    type: 'primary',
    validate: true,
    func: (props: object) => {
      this.onCreateSubmit(props)
    }
  }]
  @Provide() updateButtonList: object[] = [{
    label: '提交',
    type: 'primary',
    validate: true,
    func: (props: object) => {
      this.onUpdateSubmit(props)
    }
  }]
  created () {
    this.getRelation()
    this.getData()
  }

  get filterValues (): object {
    const { day = '', name = '', dateRange = [] }:any = this.isFilter ? this.filterFormValues : {}
    const [startTime = '', endTime = ''] = dateRange || []
    const filterData = this.isFilter ? {
      name,
      day,
      startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD') : '',
      endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD') : ''
    } : {}
    return {
      ...this.customFilterValues,
      ...filterData
    }
  }

  get tableClientHeight (): number {
    return document.body.clientHeight - 308
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
    if (relation.length) {
      const relationRequestList = relation.map((name) => {
        return request({
          url: `${name}/findList`
        }).then((data: object[]) => ({
          name,
          data
        }))
      })
      const res = await Promise.all(relationRequestList)
      const resData = res.reduce((res, item) => {
        res[item.name] = item.data.map((resItem:any) => ({
          value: resItem.id,
          label: resItem.name
        }))
        return res
      }, {})
      this.setRelationList(this.columns, resData)
      this.hasRelation = true
    } else {
      this.setRelationList(this.columns, {})
      this.hasRelation = true
    }
  }
  async getData () {
    if (this.resource) {
      this.loading = true
      const data = await request({
        url: `${this.resource}/list`,
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageIndex,
          ...this.filterValues
        }
      })
      this.currentTableData = data.records
      this.total = data.total
      this.loading = false
    } else {
      this.currentTableData = this.tableData
    }
  }
  getRelationList (columns: any) {
    const columnsList = Object.keys(columns).reduce((res: string[], item: string) => {
      if (columns[item].relation) {
        res.push(columns[item].relation)
      }
      return res
    }, [])
    return columnsList
  }
  setRelationList (columns: any, relationData: any): void {
    const columnsList = Object.keys(columns).reduce((res: any, item: string) => {
      const relationKey = columns[item].relation
      res[item] = columns[item]
      if (relationKey) {
        res[item]['form']['options'] = relationData[relationKey]
      }
      return res
    }, {})
    this.columnsList = columnsList
  }
  onPaginationChange ({ pageIndex, pageSize, ...arg }:any) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.getData()
  }
  // 搜索按钮
  handleOnSearch (data: any) {
    this.customFilterValues = data
    this.getData()
  }
  // 重置
  handleOnReset (data: any) {
    this.filterFormValues = {}
    this.$refs.customFilterForm.formValues = {}
    this.customFilterValues = {}
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
