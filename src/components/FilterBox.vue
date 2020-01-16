<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-16 16:57:55
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
.filter-box
  .name
    el-input(
      size="small"
      v-model="currentValue.name"
      clearable
      :placeholder="namePlaceholder")
  .day-range
    el-date-picker(
      size="small"
      v-model="currentValue.dateRange"
      type="daterange")
  .day
    el-radio-group(
      size="small"
      v-model="currentValue.day")
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
  @Prop() value!: any
  @Prop({ default: '名称/手机号码' }) namePlaceholder!: string
  // @Provide() name:string = ''
  // @Provide() day:string = ''
  // @Provide() dateRange:string[] = []
  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
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
