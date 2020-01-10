<template lang='pug'>
el-form(
  ref="form"
  :model="formValues"
  :label-position="labelPosition"
  :label-width="labelWidth"
  :rules="rules"
  :inline="inline"
  :size="formSize")
  el-form-item(
    v-for="(key, index) in formList"
    :key="key"
    :prop="key"
    :label="columns[key].label")
    FormItem(
      v-model="formValues[key]"
      :column="columns[key]")
  el-form-item
    ButtonList(:buttonList="formButtonList")
</template>

<script lang='ts'>
import ButtonList from '@/components/ButtonList/index.vue'
import FormItem from './FormItem/index.vue'

import { Vue, Component, Provide, Prop, PropSync, Emit } from 'vue-property-decorator'

@Component({
  components: {
    ButtonList,
    FormItem
  }
})
export default class SmartForm extends Vue {
  @Prop({ default: () => [] }) formList!: string[]
  @Prop({ default: () => ({}) }) columns!: object
  @Prop({ default: () => ({}) }) values!: object
  @Prop({ default: '80' }) labelWidth!: string
  @Prop({ default: 'left' }) labelPosition!: string
  @Prop({ default: 'small' }) formSize!: string
  @Prop({ default: () => [] }) buttonList!: object[]
  @Prop({ default: false }) inline!: boolean
  @Provide() formValues: object = this.values

  get formButtonList () {
    return this.buttonList.map((button: any) => ({
      ...button,
      funcProps: {
        ...button.funcProps,
        el: this,
        data: this.formValues
      },
      func: (data: object, props: object, name: string, event: any) => {
        if (button.validate) {
          (this.$refs.form as any).validate((valid: boolean) => {
            if (valid) {
              button.func(data, props, name, event)
            } else {
              return false
            }
          })
          return false
        }
        button.func(data, props, name, event)
      }
    }))
  }
  get rules () {
    const columns: any = this.columns
    return Object.keys(columns).reduce((res:any, key:any) => {
      if (columns[key].form) {
        res[key] = columns[key].form.rules
      }
      return res
    }, {})
  }
}
</script>
