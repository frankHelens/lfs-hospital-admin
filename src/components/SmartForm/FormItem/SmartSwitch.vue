<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 15:13:20
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
el-switch(
  v-model="currentValue"
  :disabled="disabled")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class SmartSwitch extends Vue {
  @Prop({ default: 0 }) value!: string | number
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: () => [] }) options!: object[]

  get currentValue () {
    return !!this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
}
</script>
