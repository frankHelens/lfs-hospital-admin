<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 18:19:15
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
.filter-box
  .name
    el-input(
      size="small"
      v-model="name"
      clearable
      placeholder="名称/手机号码")
  .day-range
    el-date-picker(
      size="small"
      v-model="dateRange"
      type="daterange")
  .day
    el-radio-group(
      size="small"
      v-model="day")
      el-radio-button(label="1") 今天
      el-radio-button(label="2") 昨天
      el-radio-button(label="3") 最近3天
      el-radio-button(label="4") 最近7天
      el-radio-button(label="5") 最近1月
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class FilterBox extends Vue {
  @Provide() name:string = ''
  @Provide() day:string = ''
  @Provide() dateRange:string[] = []

  updated () {
    console.log(this.name)
    console.log(this.day)
    console.log(this.dateRange)
  }
  // @Prop({ default: '' }) value!: string | number
  // @Prop({ default: false }) disabled!: boolean
  // @Prop({ default: false }) readonly!: boolean
  // @Prop({ default: '' }) placeholder!: string
  // @Prop({ default: () => [] }) options!: object[]

  // get currentValue () {
  //   return this.value
  // }
  // set currentValue (val: string | number) {
  //   this.$emit('input', val)
  // }
}
</script>

<style lang="scss" scoped>
.filter-box {
  @include flex-wrap;
  &>div {
    margin: 0 10px;
  }
}
</style>
