<template lang="html">
  <el-drawer
    size="30%"
    custom-class="custom-class"
    title="我是标题"
    :visible="drawer"
    :with-header="false"
    @close="close">
    <h4>创建表单</h4>
    <el-form ref="form" size="small" label-position="left" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="username1"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script lang="ts">
import Request from '../../utils/request'
import Vue from 'vue'
import { Component, Prop, Emit, Watch } from 'vue-property-decorator'
import UserInterface from '../../types/user'
@Component({
})
export default class Form extends Vue {
  @Prop({
    default: false
  }) private drawer!: boolean

  @Prop({
    default: 0
  }) private id?: number

  @Prop({
    default: ''
  }) private username!: string

  @Prop({
    default: ''
  }) private avatar!:string

  @Prop({
    default: ''
  }) private password!:string

  protected username1: string = ''
  protected avatar1: string = ''
  protected password1: string = ''

  onSubmit () {
    const { id } = this
    let promise = null
    const params:UserInterface  = {
      username: this.username1,
      password: this.password1
    }
    if (id) {
      promise = Request.put(`/user/${id}`, params)
    } else {
      promise = Request.post('/user', params)
    }
    promise.then((res: any) => {
      const { code, message } = res
      if (Object.is(code, 200)) {
        this.$message({
          message: message,
          type: 'success'
        })
        this.close()
      }
    }).catch(err => {
      this.$message({
        message: '保存类型失败',
        type: 'error'
      })
      throw Error(err)
    })
  }

  @Emit('close')
  close (): void {
    console.log('@Emit')
  }

  @Watch('username')
  changeUsername1 (val: string) {
    this.username1 = val
  }
   @Watch('password')
  changePassword1 (val: string) {
    this.password1 = val
  }


}
</script>
<style lang="scss" scoped>
/deep/ .custom-class {
  padding: 0 20px 20px;
}
/deep/ .el-form {
  height: 95vh;
  overflow: scroll;
}
</style>
