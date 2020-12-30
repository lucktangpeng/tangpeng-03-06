<template>
  <div class="course">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="CoursesPages" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input v-model="CoursesPages.courseName" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="CoursesPages.status"
              placeholder="状态"
              clearable
            >
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled='isloading' @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item class="btn-add">
            <el-button style="float: right;" type="primary" @click="onAddCourse">新建课程</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="course.records"
        v-loading='isloading'
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value='1'
              :inactive-value='0'
              >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button size='small' @click="skipEditCourse(scope.row)">编辑</el-button>
            <el-button size='small' @click="skipEditSections(scope.row)">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :disabled="isloading"
          :current-page="course.currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="course.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="course.total">
        </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses } from '../../services/course'
export default Vue.extend({
  name: 'CourseIndex',
  data () {
    return {
      value: '100',
      CoursesPages: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 10
      },
      course: [],
      isloading: false
    }
  },
  created () {
    this.loadQueryCourses()
  },
  methods: {
    onAddCourse () {
      this.$router.push({ name: 'CourseNew' })
    },
    skipEditCourse (row: any) {
      this.$router.push({ name: 'CourseEdit', params: { courseId: row.id } })
    },
    skipEditSections (row: any) {
      this.$router.push({ name: 'CourseSections', params: { courseId: row.id } })
    },
    onSearch () {
      this.loadQueryCourses()
    },
    async loadQueryCourses () {
      this.isloading = true
      const { data } = await getQueryCourses(this.CoursesPages)
      this.course = data.data
      this.isloading = false
    },
    handleSizeChange (size: number) {
      this.CoursesPages.pageSize = size
      this.loadQueryCourses()
    },
    handleCurrentChange (current: number) {
      this.CoursesPages.currentPage = current
      this.loadQueryCourses()
    }
  }
})
</script>

<style lang="scss" scoped>
.btn-add {
  float: right;
}
.el-table {
  margin-bottom: 20px;
}
</style>