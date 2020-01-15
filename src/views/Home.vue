<!--
 * @LastEditors  : huangfengrui
 * @LastEditTime : 2020-01-15 17:48:14
 * @Author: huangfengrui
 * @Date: 2020-01-09 11:06:30
 * @Description:
 -->
<template lang="pug">
el-container
  Headerbar
  Siderbar
  .content-box(
    :class="{'content-collapse':collapse}")
    //- el-breadcrumb.crumbs(separator="/")
    //-   el-breadcrumb-item(
    //-     v-for="breadcrumb in breadcrumbList"
    //-     :to="breadcrumb.path") {{breadcrumb.name}}
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
import { cloneDeep } from '@/utils/common'
import menus from '@/utils/menu'

@Component({
  components: {
    Headerbar,
    Siderbar
  }
})
export default class Home extends Vue {
  @Provide() collapse: boolean = false
  @Provide() tagsList: any = []
  @Provide() menuList: object[] = menus

  created () {
    this.$bus.$on('collapse', (msg: boolean) => {
      this.collapse = msg
    })
  }
  get breadcrumbList () {
    console.log('this.menuList', this.menuList)
    const routeMatched = this.$route.matched
      .filter((item, i) => i >= 1)
      .map((item:any) => {
        const currentMenu:any = this.menuList.find((menuItem:any) => item.path === menuItem.url)
        console.log('currentMenu', currentMenu)
        if (currentMenu && currentMenu.submenu) {
          const subMenu = currentMenu.submenu.find((menuItem:any) => {
            console.log('menuItem.url', menuItem.url)
            console.log('item.path', item)
            return menuItem.url === item.path
          })
          console.log(subMenu)
        //   return {
        //     name: subMenu.label,
        //     path: currentMenu.path
        //   }
        }
        // const currentMenu:any = this.menuList[index]
        // if (currentMenu.submenu) {
        //   const subIndex = currentMenu.submenu.findIndex((item:any) => currentRoute[2].path === item.url)
        //   return `${index}-${subIndex}`
        // } else {
        //   return `1-${index}`
        // }
        return {
          name: 'xxx',
          path: item.path
        }
      })
    // const breadcrumbList = routeMatched.slice(1, 2)
    console.log(routeMatched)
    return routeMatched
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
