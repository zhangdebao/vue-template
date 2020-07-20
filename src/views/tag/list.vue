<template lang="html">
  <div>
    <div class="tools">
      <el-button size="small" @click="addRow" type="primary">添加</el-button>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="search">
          <template slot="append">
            <el-button slot="append" @click="filterFun" icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </div>
    </div>
    <el-table :data="showDatas" :max-height="maxHeight">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="name" label="字符串" >
      </el-table-column>
      <el-table-column prop="is_show" label="显示" >
        <template slot-scope="{ row }">
          <span>{{row.is_show ? '显示' : '隐藏'}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="editRowShow(scope.row)" type="text" size="small">{{scope.row.is_show ? '隐藏' : '显示'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 400]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, ->, jumper"
        :total="total">
      </el-pagination>
    </div>
    <Form :drawer="drawer" @close="closeDrawer"/>
  </div>
</template>
<script lang="ts">
import Form from './form.vue'
import formMixin from '../../mixin/form'
import tableMixin from '../../mixin/table'
import Request from '../../utils/request'
import { Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
@Component({
  components: {
    Form
  }
})
export default class List extends mixins(formMixin, tableMixin) {
  mounted () {
    this.getAllTypes()
  }

  editRowShow (row: any) {
    const promise = Request.put('/course/cms/type', {
      /* eslint-disable-next-line */
        is_show: !row.is_show,
      id: row.id
    })
    promise.then((res: any) => {
      const { code } = res
      if (Object.is(code, 200)) {
        this.getAllTypes()
      }
    })
  }

  getAllTypes () {
    const { currentPage, size } = this
    const url = `/course/cms/type?page=${currentPage}&size=${size}`
    const promise = Request.get(url)
    promise.then((res: any) => {
      const { code, detail: { count, list } } = res
      if (Object.is(code, 200)) {
        this.tableData = list
        this.total = count
        this.filter()
      }
    })
  }

  handleSizeChange (val: number) {
    this.size = val
    this.getAllTypes()
  }

  handleCurrentChange (val: any) {
    this.currentPage = val
    this.getAllTypes()
  }

  filterFun () {
    const { search } = this
    this.filter((item: any) => {
      return item.date.indexOf(search) !== -1
    })
  }

  @Watch('drawer')
  drawerChange (val: boolean) {
    if (!val) {
      this.getAllTypes()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  width: 30vw;
  margin-left: 20px;
}
.tools {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
}
.pagination {
  margin-top: 20px;
}
</style>
