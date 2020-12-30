<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
          <span>权限分配</span>
      </div>
      <el-tree
      :data="Menu"
      ref="menu-tree"
      :props="defaultProps"
      node-key='id'
      :default-checked-keys="defaultKeysList"
      default-expand-all
      show-checkbox
       >
       </el-tree>
      <div style="text-align: right;">
        <el-button size='small' @click="onRest">重置</el-button>
        <el-button size='small' type="primary" @click="onSave">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '../../../services/menu'
import Vue from 'vue'
import { Tree } from 'element-ui'
export default Vue.extend({
  name: 'alloc-menu',
  props: {
    RoleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      Menu: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      menuIdList: [],
      defaultKeysList: []
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      this.Menu = data.data
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.RoleId)
      this.filterRoleMenu(data.data)
    },
    filterRoleMenu (data: any) {
      data.forEach((val: any) => {
        if (val.selected) {
          this.defaultKeysList = [...this.defaultKeysList, val.id] as never
        }
        if (val.subMenuList) {
          this.filterRoleMenu(val.subMenuList)
        }
      })
    },
    async onSave () {
      this.menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys() as never
      const { data } = await allocateRoleMenus({
        roleId: this.RoleId,
        menuIdList: this.menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    },
    onRest () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
</style>