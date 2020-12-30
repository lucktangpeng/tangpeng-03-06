<template>
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar size="large" :src="userInfo.portrait"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户配置</el-dropdown-item>
          <el-dropdown-item @click.native="exitHandle">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script lang='ts' >
import Vue from 'vue'
import { userInfo } from '../../services/user'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'Header',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userInfo: {}
    }
  },
  methods: {
    ...mapMutations(['clearUser']),
    async loadUserInfo () {
      const { data } = await userInfo()
      this.userInfo = data.content
    },
    exitHandle () {
      console.log('123')
      this.clearUser(null)
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.loadUserInfo()
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>