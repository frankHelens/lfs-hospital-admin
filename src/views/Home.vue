<template lang="pug">
el-container
  Headerbar(
    :headerMenuList="headerMenuList")
  Siderbar
  .content-box(
    :class="{'content-collapse':collapse}")
    el-breadcrumb.crumbs(separator="/")
      el-breadcrumb-item(:to="{ path: '/' }") 首页
      el-breadcrumb-item 表单
    .content
      .container
        transition(name="fade-transform" mode="out-in")
          keep-alive(:include="tagsList")
            router-view
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import Headerbar from '@/components/Headerbar.vue'
import Siderbar from '@/components/Siderbar.vue'

@Component({
  components: {
    Headerbar,
    Siderbar
  }
})
export default class Home extends Vue {
  @Provide() collapse: boolean = false
  @Provide() tagsList: any = []
  @Provide() headerMenuList: object[] = [{
    label: '地图管理',
    name: 'mapManage',
    path: '/mapManage',
    icon: 's-cooperation'
  }, {
    label: '数据管理',
    name: 'dataManage',
    path: '/dataManage',
    icon: 's-cooperation'
  }, {
    label: '产业监测',
    name: 'industryMonitor',
    path: '/industryMonitor',
    icon: 's-cooperation'
  }, {
    label: '应急指挥',
    name: 'command',
    path: '/command',
    icon: 's-cooperation'
  }, {
    label: '信息发布',
    name: 'information',
    path: '/information',
    icon: 's-cooperation'
  }, {
    label: '产业管理',
    name: 'industryManage',
    path: '/industryManage',
    icon: 's-cooperation'
  }, {
    label: '决策分析',
    name: 'decision',
    path: '/decision',
    icon: 's-cooperation'
  }, {
    label: '应用支撑',
    name: 'application',
    path: '/application',
    icon: 's-cooperation'
  }, {
    label: '平台管理',
    name: 'platform',
    path: '/platform',
    icon: 's-cooperation'
  }, {
    label: '监控管理',
    name: 'monitor',
    path: '/monitor',
    icon: 's-cooperation'
  }]
  created () {
    this.$bus.$on('collapse', (msg: boolean) => {
      this.collapse = msg
    })
  }
}
</script>

<style lang="scss">
.crumbs {
  position: relative;
  z-index: 1;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding-left: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

</style>
