<!--
 * @Author: 黄丰瑞 <huangfengrui@hqyatu.com>
 * @Date: 2019-08-02 16:00:10
 * @LastEditors: 黄丰瑞 <huangfengrui@hqyatu.com>
 * @LastEditTime: 2019-08-16 10:04:07
 * @Description: 分页
 -->
<template lang='pug'>
el-pagination(
  background
  :page-sizes="[10, 20, 50, 100]"
  layout="prev, pager, next, sizes, total"
  :page-size="pageSize"
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Emit, Prop } from 'vue-property-decorator'

@Component({})
export default class Pagination extends Vue {
  @Prop({ default: 0 }) total!: number;
  @Provide() pageSize: number = 10
  @Provide() pageIndex: number = 10

  @Emit('handleChange')
  handleCurrentChange (number: number) {
    this.pageIndex = number
    return {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
  }
  @Emit('handleChange')
  handleSizeChange (number: number) {
    this.pageSize = number
    return {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
  }
}
</script>
