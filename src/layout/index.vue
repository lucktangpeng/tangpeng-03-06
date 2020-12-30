<template>
  <div>
    <el-container>
        <el-aside width="200px"><app-aside></app-aside></el-aside>
        <el-container>
            <el-header><app-header></app-header></el-header>
            <el-main><router-view/></el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' >
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
  }
})

</script>

<style lang="scss" scoped>
.el-header {
  background: $sidebar-bg;
  position: sticky;
  top: 0;
  z-index: 100;
}

.el-aside {
  position: sticky;
  top: 0;
  max-height: 100vh;
}
</style>