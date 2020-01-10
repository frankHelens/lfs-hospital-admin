<!--
 * @LastEditors: huangfengrui
 * @LastEditTime: 2020-01-09 17:46:15
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 -->
<template lang='pug'>
div {{name}}
</template>

<script lang='ts'>
import { Vue, Component, Provide } from 'vue-property-decorator'

@Component({})
export default class Dashboard extends Vue {
  @Provide() name: string = '首页'
}
</script>
