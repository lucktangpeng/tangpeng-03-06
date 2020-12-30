<template>
<div>
  <div ref="Text"></div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { CourseUpload } from '../services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    this.TextEditorInit()
  },
  methods: {
    TextEditorInit () {
      const editor = new E(this.$refs.Text as any)
      editor.config.onchange = (newHtml: any) => {
        this.$emit('input', newHtml)
      }
      editor.create()
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await CourseUpload(fd)
        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(data.data.name)
      }
    }
  }
})
</script>

<style scoped>

</style>