<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选搜索</span>
        <el-button size='small' type="primary" @click="onSeach">查询搜索</el-button>
      </div>
      <div class="text item">
        <el-form :inline="true" :model="RolePages" class="demo-form-inline">
          <el-form-item label="输入搜索">
            <el-input size='small' v-model="RolePages.name" placeholder="角色名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-button size='small' type="primary" @click="addRole">添加角色</el-button>
      </div>
    </el-card>
    <el-card class="box-card table-content">
      <div class="text item">
        <page-table
        ref="PagesTable"
        :isloading='isloading'
        :data=Role
        :labelList="RoleLabelList"
        @sizeChange='handleSizeChange'
        @currentChange='handleCurrentChange'
        >
          <div slot="edit" slot-scope="scope">
              <el-row :gutter="20" style="text-align: center;">
                <el-button @click="skipAlloc(scope.row)" type="text" size="small">分配菜单</el-button>
                <el-button @click="skipAllocResource(scope.row)" type="text" size="small">分配资源</el-button>
              </el-row>
              <el-row :gutter="20" style="text-align: center;">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
              </el-row>
          </div>
        </page-table>
      </div>
    </el-card>
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogVisible"
      width="30%">
      <create-or-edit
      @cancel='dialogVisible = false'
      @success='success'
      :RoleId='RoleId'
      v-if="dialogVisible"
      >
      </create-or-edit>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRolePages, deleteRoleID } from '../../services/role'
import PageTable from '../../components/PageTable.vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      Role: {},
      RolePages: {
        name: '',
        current: 1,
        size: 10
      },
      RoleLabelList: [
        {
          prop: 'id',
          label: '编号'
        },
        {
          prop: 'name',
          label: '角色名称'
        },
        {
          prop: 'description',
          label: '描述'
        },
        {
          prop: 'createdTime',
          label: '添加时间'
        }
      ],
      isloading: false,
      dialogVisible: false,
      RoleId: ''
    }
  },
  created () {
    this.loadRolePages()
  },
  components: {
    PageTable,
    CreateOrEdit
  },
  methods: {
    async loadRolePages () {
      this.isloading = true
      const { data } = await getRolePages(this.RolePages)
      if (data.code === '000000') {
        this.Role = data.data
      } else {
        this.$message.error('数据刷新失败，请联系管理员')
      }
      this.isloading = false
    },
    handleEdit (item: any) {
      this.RoleId = item.row.id
      this.dialogVisible = true
    },
    async handleDelete (item: any) {
      await deleteRoleID(item.row.id)
      this.$message.success('删除成功')
      this.loadRolePages()
    },
    handleSizeChange (val: any) {
      this.RolePages.size = val
      this.loadRolePages()
    },
    handleCurrentChange (val: any) {
      this.RolePages.current = val
      this.loadRolePages()
    },
    onSeach () {
      this.loadRolePages()
    },
    success () {
      this.dialogVisible = false
      this.loadRolePages()
    },
    addRole () {
      this.dialogVisible = true
    },
    skipAlloc (scope: any) {
      this.$router.push({ name: 'alloc-menu', params: { RoleId: scope.row.id } })
    },
    skipAllocResource (scope: any) {
      this.$router.push({ name: 'allocResource', params: { RoleId: scope.row.id } })
    }
  }
})
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
}
.el-form {
  padding: 0;
  padding-left: 50px;
}
::v-deep .el-card__header {
  border: none;
  padding-bottom: 0;
  th{
    text-align: center;
  }
}
.el-form-item {
  margin: 0;
}
.table-content {
  .el-table--border {
    border: none;
  }
}

</style>