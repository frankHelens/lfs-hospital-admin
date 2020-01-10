<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 15:51:34
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description: 表单封装
 -->
<template lang='pug'>
components(
  v-model="currentValue"
  v-bind="column.form"
  :options="column.options"
  :is="getComponent(column.form.type)")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class FormItem extends Vue {
  @Prop({ default: '' }) value!: string | number
  @Prop({ default: () => ({}) }) column!: object

  @Provide() componentEnum: any = {
    input: require('element-ui').Input,
    select: require('./SmartSelect').default,
    password: require('./Password').default,
    number: require('element-ui').InputNumber,
    switch: require('element-ui').Switch
  }

  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }

  getComponent (type: string) {
    return this.componentEnum[type]
  }
}
</script>
