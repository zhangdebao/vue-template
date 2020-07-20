<template lang="html">
  <el-drawer
    size="30%"
    custom-class="custom-class"
    title="我是标题"
    :visible="drawer"
    :with-header="false"
    @close="close">
    <h4>创建表单</h4>
    <el-form ref="form" size="small" :model="form" label-position="left" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <Upload v-model="img"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script lang="ts">
import Upload from '../../components/upload.vue'
import Request from '../../utils/request'
import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'
interface FormInterface {
  id: number;
  name: string;
}
@Component({
  components: {
    Upload
  }
})
export default class Form extends Vue {
  @Prop({
    default: false
  }) private drawer!: boolean

  @Prop({
    default: () => {
      return {
        id: 0,
        name: ''
      }
    }
  }) private form!: FormInterface

  public img = ''

  onSubmit () {
    const { form: { name } } = this
    const promise = Request.post('/course/type', {
      name
    })
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
