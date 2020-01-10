<!--
 * @Description: ButtonItem 组件
 * @Author: 黄丰瑞
 * @Date: 2019-07-25 09:52:04
 * @LastEditTime : 2020-01-09 17:39:39
 * @LastEditors  : huangfengrui
 -->
<template lang="pug">
  el-tooltip(
    :disabled="!tooltip"
    effect="dark"
    :content="label"
    placement="top-start")
    el-button.btn(
      :loading="loading"
      :type="type"
      :plain="plain"
      :round="round"
      :circle="circle"
      :style="buttonStyle"
      :disabled="disabled"
      :size="size"
      :icon="`el-icon-${icon}`"
      @click="handleClick")
        span(v-if="!tooltip") {{label}}
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, Provide } from 'vue-property-decorator'

@Component({})
export default class ButtonItem extends Vue {
  // @PropSync('loading', { type: Boolean }) isLoading!: boolean
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: '' }) type!: string
  @Prop({ type: String, default: 'small' }) size!: string
  @Prop({ type: Boolean, default: false }) plain!: boolean
  @Prop({ type: Boolean, default: false }) round!: boolean
  @Prop({ type: Boolean, default: false }) circle!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Object, default: () => ({}) }) buttonStyle!: object
  @Prop({ type: Object, default: () => ({}) }) funcProps!:object
  @Prop({ type: Function }) func!:any
  @Prop({ default: false }) tooltip!: boolean
  @Provide() loading: boolean = false

  handleClick () {
    if (this.func) {
      this.func({
        button: this,
        ...this.funcProps
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.btn-icon
  padding-right: 4px
</style>
