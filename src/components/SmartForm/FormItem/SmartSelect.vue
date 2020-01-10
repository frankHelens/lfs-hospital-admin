<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 17:10:51
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 -->
<template lang='pug'>
el-select(
  v-model="currentValue"
  :disabled="disabled"
  :readonly="readonly"
  :placeholder="placeholder")
  el-option(
    v-for="item in currentOptions"
    :key="item.value"
    :label="item.label"
    :value="item.value")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class SmartInput extends Vue {
  @Prop({ default: '' }) value!: string | number
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: () => [] }) options!: object[]

  get currentOptions () {
    return this.options
  }

  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
}
</script>
