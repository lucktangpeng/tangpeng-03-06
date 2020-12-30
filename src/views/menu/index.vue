<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size='small' @click="skipAdd">添加菜单</el-button>
      </div>
      <el-table
        :data="menuAllList"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          type='index'
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
           <template slot-scope="scope">
             {{scope.row.level === 0 ? '一级' : '二级'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuAll, deleteMenuEdit } from '../../services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menuAllList: [],
      loading: true
    }
  },
  created () {
    this.loadMenuAll()
  },
  methods: {
    skipAdd () {
      this.$router.push({ name: 'menu-create' })
    },
    async loadMenuAll () {
      this.loading = true
      const { data } = await getMenuAll()
      this.menuAllList = data.data
      this.loading = false
    },
    handleEdit (row: any) {
      this.$router.push({ name: 'menu-edit', params: { id: row.id } })
    },
    async handleDelete (row: any) {
      this.loading = true
      const { data } = await deleteMenuEdit(row.id)
      if (data.data.code === '000000') {
        this.$message.success('删除成功')
        this.loadMenuAll()
      } else {
        this.$message.error('删除失败，请联系管理员')
      }
      this.loading = false
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0;
}
.el-table--border {
  border: none;
}

</style>