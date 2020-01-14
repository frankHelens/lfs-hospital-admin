<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-14 09:24:32
 * @Author: huangfengrui
 * @Date: 2020-01-09 15:51:42
 * @Description: password
 -->
<template lang='pug'>
el-upload(
  name="files"
  list-type="picture"
  action="/admin/uploading/img"
  :file-list="fileList"
  :limit="limit"
  :headers="headers"
  :on-success="handleSuccess"
  :on-remove="handleRemove")
  //- i.el-icon-plus
  el-button(size="small" type="primary") 点击上传
</template>

<script lang='ts'>
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'
import { storage } from '@/utils/common'

@Component
export default class SmartPassword extends Vue {
  @Prop({ default: '' }) value!: any
  @Prop({ default: 1 }) limit!: number
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: '' }) placeholder!: string
  @Prop({ default: () => [] }) options!: object[]

  @Provide() fileList: object[] = this.formatFileList(this.value)
  @Provide() fileRemoteList: string[] = []

  @Provide() headers: object = {
    token: storage.get('token'),
    sign: 1
  }

  // get currentValue () {
  //   console.log(this.value)
  //   return this.value ? this.formatFileList(this.value.split(',')) : []
  // }
  handleSuccess (res:any, file: any) {
    if (res.code === 0) {
      this.fileList.push(file)
      this.fileRemoteList.push(res.data[0])
      this.$emit('input', this.fileRemoteList.join(','))
    }
  }
  handleRemove (file:any, fileList: any) {
    this.fileList = fileList
    this.fileRemoteList = fileList.length ? fileList.map((item: any) => item.url) : []
    this.$emit('input', this.fileRemoteList.join(','))
  }
  formatFileList (files: string) {
    return files ? files.split(',').map(item => {
      const strSplitList = item.split('/')
      const name = item.split('/')[strSplitList.length - 1]
      return {
        name,
        url: item
      }
    }) : []
  }
  // set currentValue (val: string | number) {
  //   this.$emit('input', val)
  // }
}
</script>
