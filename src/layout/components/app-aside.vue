<template>
    <div class="aside">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/role"><i class="el-icon-menu"></i>角色管理</el-menu-item>
            <el-menu-item index="/menu"><i class="el-icon-menu"></i>菜单管理</el-menu-item>
            <el-menu-item index="/resource"><i class="el-icon-menu"></i>资源管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/Courses">
          <i class="el-icon-menu"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/Users">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
</template>

<script lang='ts' >
import Vue from 'vue'
export default Vue.extend({
  name: 'Aside'
})
</script>

<style lang="scss" scoped>
.aside {
  // height: 100%;
  .el-menu {
    height: 100vh;
    border: none;
  }
}
</style>