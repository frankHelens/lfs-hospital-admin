<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-09 15:50:19
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:45:50
 * @Description:
 -->
<template lang='pug'>
SmartForm(
  :values="formValues"
  :columns="columns"
  :formList="formList"
  :buttonList="buttonList")
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'
import SmartForm from '@/components/SmartForm/index.vue'

@Component({
  components: {
    SmartForm
  }
})
export default class ChangePassword extends Vue {
  @Provide() formValues:object = {
    name: '默认名字',
    password: '默认密码'
  }
  @Provide() formList: string[] = ['oldPassword', 'newPassword']
  @Provide() columns: object = {
    oldPassword: {
      label: '旧密码',
      form: {
        type: 'password',
        rules: [
          { validator: (rule: any, value: any, callback:any) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          },
          trigger: 'blur' }
        ]
      }
    },
    newPassword: {
      label: '新密码',
      form: {
        type: 'password',
        rules: [
          { validator: (rule: any, value: any, callback:any) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  }
  @Provide() buttonList: object[] = [{
    label: '提交',
    validate: true,
    func: ({ button, data }: any) => {
      console.log(button, data)
    }
  }]
}
</script>
