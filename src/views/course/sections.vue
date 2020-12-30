<template>
  <div>
    <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>课程分配</span>
        <el-button style='float: right padding: 3px 0' type='text'
          >+添加阶段</el-button
        >
      </div>
      <el-tree
      :data="Sections"
      node-key='id'
      :props="defaultProps"
      draggable
      :allow-drop='allowDrop'
      @node-drop='nodeDrop'
      >
      <div class="inner" slot-scope="{ node, data }">
        <span>{{node.label}}</span>
        <span v-if="data.sectionName">
          <el-button>编辑</el-button>
          <el-button type="primary">添加课时</el-button>
          <el-button>已隐藏</el-button>
        </span>
        <span v-else >
          <el-button>编辑</el-button>
          <el-button type="success" @click="skipVideo(node, data)">上传视频</el-button>
          <el-button>已隐藏</el-button>
        </span>
      </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateSection } from '../../services/course'
export default Vue.extend({
  name: 'CourseSections',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      Sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created () {
    this.loadCourseLessonById()
  },
  methods: {
    skipVideo (node: any, data: any) {
      this.$router.push({ name: 'CourseVideo', params: { courseId: this.courseId as string }, query: { sectionId: node.parent.id, lessonId: data.id } })
    },
    allowDrop (draggingNode: any, dropNode: any, type: any) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async loadCourseLessonById () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.Sections = data.data
    },
    async nodeDrop (dragNode: any, dropNode: any, type: any, event: any) {
      console.log(dragNode)
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.lessonDTOS) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
        this.$message.error('顺序调整失败')
      }
    }
  }
})
</script>

<style scoped>
.inner {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: center;
  flex: 1;
}

::v-deep .el-tree-node__content {
  height: auto;
}
</style>