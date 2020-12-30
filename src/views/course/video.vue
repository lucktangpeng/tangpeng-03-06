<template>
  <div>
    <el-card class='box-card'>
      <div slot='header' class='clearfix'>
        <span>视频上传</span>
        <el-button style='float: right; padding: 3px 0' type='text'>操作按钮</el-button>
      </div>
      <el-form ref='form' :model='form' label-width='80px'>
        <el-form-item label='课程'>
          <el-input v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label='课时'>
          <el-input v-model='form.name'></el-input>
        </el-form-item>
        <el-form-item label='视频上传'>
          <el-upload
            class='upload-demo'
            ref='video'
            action='https://jsonplaceholder.typicode.com/posts/'
            multiple
            :http-request='Uploader'
            :limit='3'>
            <el-button type='primary'>点击上传</el-button>
            <!-- <div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label='封面上传'>
          <el-upload
            class='upload-demo'
            ref='img'
            action='https://jsonplaceholder.typicode.com/posts/'
            multiple
            :http-request='UploaderImg'
            :limit='3'>
            <el-button type='primary' >点击上传</el-button>
            <!-- <div slot='tip' class='el-upload__tip'>只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type='primary' @click="handleUpload">开始上传</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  getAliyunTransCode,
  getAliyunTransCodePercent
} from '../../services/aliyun-upload'
export default Vue.extend({
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      form: {},
      videoList: [] as any,
      imgList: [] as any,
      uploader: {} as any,
      imageUrl: '',
      videoId: ''
    }
  },
  created () {
    this.initUploader()
  },
  computed: {
    video (): any {
      return this.$refs.video
    }
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: '122',
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: '',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          let uploadAddressAndAuth
          if (uploadInfo.isImage) {
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            uploadAddressAndAuth = data.data
            this.imageUrl = data.data.imageURl
          } else {
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            uploadAddressAndAuth = data.data
            this.videoId = uploadAddressAndAuth.videoId
          }

          // 调用 uploader.setUploadAuthAndAddress 设置上传凭证
          ;(this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log(uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log(uploadInfo, code, message)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {
          console.log(uploadInfo, totalSize, loadedPercent)
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log(uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          const { data } = await getAliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageUrl,
            fileName: this.videoList[0].name,
            fileId: this.videoId
          })
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            console.log(data.data)
            if (data.data === 100) {
              console.log('转码成功')
              clearInterval(timer)
            }
          }, 3000)
        }
      })
    },
    handleUpload () {
      const videoFile = this.videoList[0]
      const imageFile = this.imgList[0]
      const uploader = this.uploader
      console.log(this.uploader)
      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      // 开始上传
      // 一旦开始上传，它就会按照列表中添加的顺序开始上传
      uploader.startUpload()
    },
    Uploader (option: any) {
      this.videoList.push(option.file)
    },
    UploaderImg (option: any) {
      this.imgList.push(option.file)
    }
  }
})
</script>

<style scoped></style>