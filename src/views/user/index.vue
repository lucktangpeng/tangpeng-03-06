<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
        ref="form"
        :model="UserPages"
        label-width="80px"
        :inline="true"
        >
          <el-form-item label="手机号">
            <el-input size='medium' v-model="UserPages.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              size='medium'
              v-model="PickStartAndEnd"
              type="daterange"
              format='yyyy-MM-dd'
              value-format='yyyy-MM-dd'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size='medium' @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
        <el-table
        :data="User.records"
        border
        v-loading='isloading'
        style="width: 100%">
          <el-table-column
            prop="id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="portrait"
            label="头像">
            <template slot-scope="scope">
              <el-avatar :size="50" :src="scope.row.portrait"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间">
            <template slot-scope="scope">
              {{scope.row.createTime | DateFormat}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <!--  slot-scope="scope" -->
            <template slot-scope="scope">
              <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value='true'
              :inactive-value='false'
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status" @click="scope.row.status = !scope.row.status" type="text" size="small">禁用</el-button>
              <el-button @click="editRole(scope.row)" type="text" size="small">分配角色</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="UserPages.currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="UserPages.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="User.total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select v-model="RouleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in RoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="onSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '../../services/user'
import { getRolesWithUserPermission, allocateUserRoles } from '../../services/role'
import { allocateRoleMenus } from '../../services/menu'
export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      UserPages: {
        phone: '',
        currentPage: 1,
        pageSize: 10,
        startCreateTime: '',
        endCreateTime: ''
      },
      PickStartAndEnd: [],
      isloading: false,
      UserLabelList: [
        {
          prop: 'id',
          label: '用户ID'
        },
        {
          prop: 'portrait',
          label: '头像'
        },
        {
          prop: 'name',
          label: '用户名'
        },
        {
          prop: 'phone',
          label: '手机号'
        },
        {
          prop: 'createTime',
          label: '注册时间'
        }
      ],
      User: {},
      dialogVisible: false,
      UserId: null,
      RoleList: [],
      RouleIdList: [] as any[]
    }
  },
  created () {
    this.loadUserPages()
  },
  methods: {
    onSearch () {
      this.loadUserPages()
    },
    async loadUserPages () {
      this.isloading = true
      const { data } = await getUserPages(this.UserPages)
      this.User = data.data
      this.isloading = false
    },
    handleSizeChange (size: number) {
      this.UserPages.pageSize = size
      this.loadUserPages()
    },
    handleCurrentChange (current: number) {
      this.UserPages.currentPage = current
      this.loadUserPages()
    },
    editRole (row: any) {
      this.RouleIdList = []
      this.UserId = row.id
      this.loadRolesWithUserPermission()
      this.dialogVisible = true
    },
    onSubmit () {
      this.AllocateUserRoles()
      this.dialogVisible = false
    },
    async loadRolesWithUserPermission () {
      const { data } = await getRolesWithUserPermission(this.UserId)
      this.RoleList = data.data
      data.data.forEach((val: any) => {
        if (val.hasPermission) {
          this.RouleIdList.push(val.id)
        }
      })
      console.log(data)
    },
    async AllocateUserRoles () {
      const { data } = await allocateUserRoles({
        userId: this.UserId,
        rouleIdList: this.RouleIdList
      })
      console.log(data)
    }
  },
  watch: {
    PickStartAndEnd: function (newValue: any, oldValue: any) {
      [this.UserPages.startCreateTime, this.UserPages.endCreateTime] = newValue
    }
  }
})
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0;
}
.el-form-item {
  margin-bottom: 0;
}
.el-table {
  margin-bottom: 20px;
}
::v-deep .el-card__header {
  border: none;
}
</style>