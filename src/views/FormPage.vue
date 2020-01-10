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
export default class FormPage extends Vue {
  @Provide() formValues:object = {
    name: '默认名字',
    password: '默认密码'
  }
  @Provide() formList: string[] = ['name', 'password', 'sex']
  @Provide() columns: object = {
    name: {
      label: '姓名',
      form: {
        type: 'input',
        rules: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    },
    password: {
      label: '密码',
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
    sex: {
      label: '性别',
      form: {
        type: 'select',
        options: [{
          label: '男',
          value: 'man'
        }, {
          label: '女',
          value: 'woman'
        }]
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
