<template>
  <div class="resource">
    <el-card class="box-card">
      <div class="formFilter">
        <el-form ref="form" :inline="true" :model="resourcePages" class="demo-form-inline">
          <el-form-item prop="name" label="资源名称">
            <el-input size="small" v-model="resourcePages.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input size="small" v-model="resourcePages.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select size="small" clearable v-model="resourcePages.categoryId" placeholder="全部">
              <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled='isloading' size="small" @click="onRest">重置</el-button>
            <el-button :disabled='isloading' size="small" type="primary" @click="onSearch">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <el-button size="small" @click="onSubmit">添加</el-button>
        <el-button size="small" @click="onSubmit">资源分类</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <el-table
          :data="resourceList"
          v-loading='isloading'
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="url"
            label="资源路径">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="添加时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          :disabled='isloading'
          @current-change="handleCurrentChange"
          :current-page="resourcePages.current"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="resourcePages.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Form } from 'element-ui'
import Vue from 'vue'
import { getResourcePages, getCategoryAll } from '../../services/resource'

export default Vue.extend({
  name: 'ResourceIndex',
  data () {
    return {
      resourceList: [],
      categoryList: [],
      resourcePages: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 10
      },
      total: 0,
      isloading: false
    }
  },
  created () {
    this.loalResourcePages()
    this.loadCategoryAll()
  },
  methods: {
    onSubmit () {
      console.log('submit')
    },
    onSearch () {
      this.loalResourcePages()
    },
    async loalResourcePages () {
      this.isloading = true
      const { data } = await getResourcePages(this.resourcePages)
      if (data.code === '000000') {
        this.resourceList = data.data.records
        this.total = data.data.total
      } else {
        this.$message.error('数据刷新失败，请联系管理员')
      }
      this.isloading = false
    },
    async loadCategoryAll () {
      const { data } = await getCategoryAll()
      if (data.code === '000000') {
        this.categoryList = data.data
      } else {
        this.$message.error('数据刷新失败，请联系管理员')
      }
    },
    handleSizeChange (val: any) {
      this.resourcePages.size = val
      this.loalResourcePages()
    },
    handleCurrentChange (val: any) {
      this.resourcePages.current = val
      this.loalResourcePages()
    },
    onRest () {
      (this.$refs.form as Form).resetFields()
      this.resourcePages.current = 1
      this.loalResourcePages()
    },
    handleClick () {
      console.log('编辑')
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
</style>