<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 14:55:28
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
.editor
  quill-editor(
    v-model="currentValue"
    ref="quillEditor"
    :options="editorOption"
    :height="300")
//- el-input(
//-   v-model="currentValue"
//-   :disabled="disabled"
//-   :readonly="readonly"
//-   :placeholder="placeholder"
//-   type="password")
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'

@Component
export default class SmartRichtext extends Vue {
  @Prop({ default: '' }) value!: string | number
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: () => [] }) options!: object[]

  @Provide() editorOption: object = {
    syntax: {
      height: '300px'
      // highlight: text => hljs.highlightAuto(text).value
    }
  }

  get currentValue () {
    return this.value
  }
  set currentValue (val: string | number) {
    this.$emit('input', val)
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 300px;
  max-height: 380px;
  .quill-editor {
    height: 200px;
  }
}
</style>
