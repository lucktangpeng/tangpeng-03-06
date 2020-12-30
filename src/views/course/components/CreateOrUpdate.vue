<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-steps :active="active" simple>
          <el-step title="基本信息" @click.native="active = 0" icon="el-icon-edit"></el-step>
          <el-step title="课程封面" @click.native="active = 1" icon="el-icon-upload"></el-step>
          <el-step title="销售信息" @click.native="active = 2" icon="el-icon-picture"></el-step>
          <el-step title="秒杀活动" @click.native="active = 3" icon="el-icon-picture"></el-step>
          <el-step title="课程详情" @click.native="active = 4" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>
      <el-form ref="form" :model="course" label-width="80px">
        <div v-if="active === 0">
            <el-form-item label="名称">
                <el-input v-model="course.courseName"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="course.brief"></el-input>
            </el-form-item>
            <el-form-item label="讲师姓名">
                <el-input v-model="course.teacherDTO.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="职位">
                <el-input v-model="course.teacherDTO.position"></el-input>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="course.teacherDTO.description"></el-input>
            </el-form-item>
            <el-form-item label="课程描述">
                <el-input v-model="course.previewFirstField"></el-input>
                <el-input v-model="course.previewSecondField"></el-input>
            </el-form-item>
            <el-form-item label='课程排序'>
                <el-input-number
                v-model="course.sortNum"
                label="描述文字">
                </el-input-number>
            </el-form-item>
        </div>
        <div v-if="active === 1">
            <el-form-item label='课程封面'>
              <upload-image v-model="course.courseListImg"></upload-image>
            </el-form-item>
            <el-form-item label='解锁封面'>
              <upload-image v-model="course.courseImgUrl"></upload-image>
            </el-form-item>
        </div>
        <div v-if="active === 2">
            <el-form-item label='售卖价格'>
                <el-input placeholder="请输入内容" v-model="course.discounts">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label='商品原价'>
                <el-input placeholder="请输入内容" v-model="course.price">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label='销量'>
                <el-input placeholder="请输入内容" v-model="course.sales">
                    <template slot="append">单</template>
                </el-input>
            </el-form-item>
            <el-form-item label='活动标签'>
                <el-input
                v-model="course.priceTag"
                type="text"
                maxlength="4"
                show-word-limit
                >
                </el-input>
            </el-form-item>
        </div>
        <div v-if="active === 3">
            <el-form-item label='限时秒杀开关'>
                <el-switch
                v-model="course.activityCourse"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <template v-if="course.activityCourse">
                <el-form-item label='开始时间'>
                    <el-date-picker
                    v-model="course.activityCourseDTO.beginTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label='结束时间'>
                    <el-date-picker
                    v-model="course.activityCourseDTO.endTime"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"/>
                </el-form-item>
                <el-form-item label='秒杀价'>
                    <el-input v-model="course.activityCourseDTO.amount">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label='秒杀库存'>
                    <el-input v-model="course.activityCourseDTO.stock">
                        <template slot="append">个</template>
                    </el-input>
                </el-form-item>
            </template>
        </div>
        <div v-if="active === 4">
            <el-form-item label='课程详情'>
                <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
            </el-form-item>
        </div>
      </el-form>
      <el-button v-if="active < 4" @click="onActive">下一步</el-button>
      <el-button v-else type="primary" @click="onSubmit">提交</el-button>
    </el-card>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateCourse, getCourseById } from '../../../services/course'
import UploadImage from '../../../components/UploadImage.vue'
import TextEditor from '../../../components/TextEditor.vue'
export default Vue.extend({
  name: 'CourseCreate',
  data () {
    return {
      course: {
        courseName: '',
        brief: '',
        courseDescriptionMarkDown: '',
        previewFirstField: '',
        teacherDTO: {
          teacherName: '',
          position: '',
          description: ''
        },
        courseListImg: '',
        courseImgUrl: '',
        sortNum: '',
        discounts: '',
        price: '',
        sales: '',
        priceTag: '',
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: '',
          stock: ''
        }
      },
      active: 0,
      imageUrl: '',
      num: '',
      isSeckill: false
    }
  },
  props: {
    isEdit: {
      type: Boolean
    },
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    UploadImage,
    TextEditor
  },
  async created () {
    if (this.isEdit) {
      console.log('获取数据')
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
    }
  },
  methods: {
    onActive () {
      this.active++
    },
    async onSubmit () {
      const { data } = await saveOrUpdateCourse(this.course)
      this.$router.back()
    }
  }
})
</script>

<style scoped>

</style>