<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-10 17:11:41
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
export default class Password extends Vue {
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
