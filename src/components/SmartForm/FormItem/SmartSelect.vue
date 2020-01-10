<template lang='pug'>
el-select(
  v-model="currentValue"
  :disabled="disabled"
  :readonly="readonly"
  :placeholder="placeholder")
  el-option(
    v-for="item in options"
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

  updated () {
    console.log(this.options)
  }
  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
}
</script>
