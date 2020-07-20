<template>
  <el-upload
  action=""
  class="avatar-uploader"
  :show-file-list="false"
  :http-request="uploadFile"
  :before-upload="beforeAvatarUpload">
  <img v-if="value" :src="`${value}?x-oss-process=image/resize,m_fill,w_${width},h_${height}`" class="avatar" :style="{ width: `${width}px`, height: `${height}px` }">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script lang="ts">
import Request from '../utils/request'
import Vue from 'vue'
import { Component, Prop, Emit, Model } from 'vue-property-decorator'
@Component
export default class Upload extends Vue {
  @Prop({
    default: 160
  }) private width!: number

  @Prop({
    default: 160
  }) private height!: string

  @Model('input', {
    default: ''
  }) public value !: string

  @Emit('input')
  uploadFile ({ file }: { file: any }) {
    const formData = new FormData()
    formData.append('name', 'test')
    formData.append('file', file)
    return new Promise((resolve, reject) => {
      const promise = Request.post('/bbs/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      promise.then(res => {
        const { data } = res
        let url = data[0]
        if (url.indexOf('https') === -1) {
          url = url.replace('http', 'https')
        }
        resolve(url)
      }).catch(err => {
        reject(err)
      })
    })
  }

  beforeAvatarUpload (file: any) {
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 10MB!')
    }
    return isLt2M
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }
</style>
