<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-13 15:43:32
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
el-input(
  v-model="currentValue"
  :disabled="disabled"
  :readonly="readonly"
  :placeholder="placeholder"
  type="password")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class SmartPassword extends Vue {
  @Prop({ default: '' }) value!: string | number
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: () => [] }) options!: object[]

  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
}
</script>
