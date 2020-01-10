<template lang="pug">
.header-wrapper
  .header
    a.logo.horizontal-collapse-transition(
      :class="{'collapse': collapse}"
      href="/") 类风湿互助
    .collapse-btn(@click="handleCollapse")
      i.iconfont.icon-category
    .header-right
      .header-user-con
        .user-name {{name}}
        el-dropdown.user-avator(
          trigger="click"
          @command="handleClickItem")
          img(src="https://lfshz.oss-cn-shenzhen.aliyuncs.com/lfshz_images/201911011541553c53.png")
          el-dropdown-menu(
            slot="dropdown")
            el-dropdown-item(command="changePassword") 修改密码
            el-dropdown-item(command="logout") 退出登录
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator'
import { storage } from '@/utils/common'

@Component
export default class Headerbar extends Vue {
  @Provide() collapse: boolean = false
  @Provide() name: string = '管理员'

  handleCollapse ():void {
    this.collapse = !this.collapse
    this.$bus.$emit('collapse', this.collapse)
  }
  private handleClickItem (name: string):void {
    if (name === 'logout') {
      this.$router.replace('/login')
      storage.clear()
    }
    if (name === 'changePassword') {
      this.$router.push('/changePassword')
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  width: 100%;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logo {
    width: 200px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    float: left;
    line-height: 60px;
    background: rgb(0, 21, 41);
    &.collapse {
      width: 64px;
    }
  }
}

.collapse-btn {
  float: left;
  width: 63px;
  text-align: center;
  height: 100%;
  cursor: pointer;
  line-height: 60px;
  color: #666;
  .iconfont {
    font-size: 30px;
  }
}
.header-right {
  float: right;
  padding-right: 20px;
}

.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
  font-size: 16px;
}

.user-name {
  margin: 0 20px 0 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.user-logout {
  border: 1px solid #fff;
  border-radius: 18px;
  padding: 3px 18px;
  font-size: 14px;
}

.collapse-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>
