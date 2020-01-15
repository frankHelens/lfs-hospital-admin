<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-15 16:00:36
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 -->
<template lang="pug">
.login-wrapper
  .login-box
    h1 医院后台管理系统
    SmartForm(
      :columns="columns"
      :formList="formList"
      :buttonList="buttonList")
  //- <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
  //-   <h3 class="login-title">类风湿互助系统</h3>
  //-   <el-form-item label="账号" prop="username">
  //-     <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
  //-   </el-form-item>
  //-   <el-form-item label="密码" prop="password">
  //-     <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
  //-   </el-form-item>
  //-   <el-form-item>
  //-     <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
  //-   </el-form-item>
  //- </el-form>

</template>

<script lang="ts">
import { Vue, Provide, Component } from 'vue-property-decorator'
import SmartForm from '@/components/SmartForm/index.vue'
import { storage } from '@/utils/common'

@Component({
  components: {
    SmartForm
  }
})
export default class Login extends Vue {
  @Provide() columns: object = {
    username: {
      label: '账号',
      form: {
        type: 'input'
      }
    },
    password: {
      label: '密码',
      form: {
        type: 'password'
      }
    }
  }

  @Provide() formList: string[] = ['username', 'password']

  @Provide() buttonList: object[] = [{
    label: '登录',
    validate: true,
    func: async ({ button, data }: any) => {
      const { token, name } = await this.$systemApi.login(data)
      storage.set('token', token || '')
      storage.set('name', name || '')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
      button.$router.push('/')
    }
  }]
}

</script>
<style lang="scss" scoped>
  h1 {
    font-size: 33px;
    text-align: center;
    margin: 0;
  }
  .login-box {
    width: 368px;
    margin: 100px auto;
    border: 1px solid #DCDFE6;
    // width: 350px;
    // margin: 180px auto;
    padding: 35px 35px 15px 35px;
    // border-radius: 5px;
    // -webkit-border-radius: 5px;
    // -moz-border-radius: 5px;
    // box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
