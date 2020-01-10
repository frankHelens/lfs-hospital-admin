<template lang="pug">
//- el-aside(
//-   :width="collapse ? '70px' : '200px'" )
.sidebar
  el-menu.sidebar-el-menu(
    background-color="#001529"
    text-color="#c7c7c7"
    active-text-color="#03a9f4"
    default-active="1-4-1"
    :collapse="collapse"
    :default-active="defaultActive")
    template(
      v-for="(menu, i) in menuList")
      el-submenu(
        v-if="menu.submenu"
        :index="`${i}`")
        template(slot="title")
          i.el-icon-menu
          span(slot="title") {{menu.label}}
        el-menu-item(
          v-for="(item, j) in menu.submenu"
          :key="j"
          :index="`${i}-${j}`"
          @click="handleClickMenu(item)")
          i.el-icon-menu
          span(slot="title") {{item.label}}
      el-menu-item(
        v-else
        :index="`1-${i}`"
        @click="handleClickMenu(menu)")
        i.el-icon-menu
        span(slot="title") {{menu.label}}
</template>

<script lang="ts">
import { Vue, Provide, Component } from 'vue-property-decorator'

@Component({})
export default class Siderbar extends Vue {
  @Provide() collapse: boolean = false;
  @Provide() activeIndex: string = '0';
  @Provide() menuList: object[] = [
    {
      icon: 'menu',
      name: 'hospital',
      label: '医院管理',
      url: '/hospital'
    },
    {
      icon: 'menu',
      name: 'information',
      label: '资讯管理',
      url: '/information'
    },
    {
      icon: 'menu',
      name: 'dashboard',
      label: '首页',
      url: '/dashboard'
    },
    {
      icon: 'menu',
      name: 'formPage',
      label: '表单',
      url: '/formPage'
    },
    {
      icon: 'menu',
      name: 'datatablePage',
      label: '表格',
      url: '/datatablePage'
    },
    {
      icon: 'menu',
      name: 'buttonListPage',
      label: '按钮组',
      url: '/buttonListPage'
    }
  ];
  created (): void {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    this.$bus.$on('collapse', (msg: boolean) => {
      this.collapse = msg
    })
  }
  handleClickMenu ({ url }: any) {
    this.$router.push(url)
  }

  public get defaultActive () : string {
    return '1-1'
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  width: auto;
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
  z-index: 1;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-item.is-active{
  background: #1890ff !important;
  color: #fff !important;
}

.sidebar > ul {
  height: 100%;
}
</style>
