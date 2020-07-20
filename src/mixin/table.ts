import Vue from 'vue'
import { Watch, Component } from 'vue-property-decorator'
@Component
export default class TableMixin extends Vue {
  public tableData: Array<any> = []
  public showDatas: Array<any> = []
  public total = 0
  public size = 10
  public currentPage= 1
  public search = ''
  public drawer = false
  public maxHeight = 0
  public row: object|null = {}
  mounted () {
    this.$nextTick(() => {
      this.maxHeight = document.body.clientHeight - 200
    })
  }

  editRow (row: object|null) {
    this.row = row
    this.drawer = true
  }

  public filter (filterFun?: Function) {
    this.showDatas = this.tableData.filter(item => {
      if (filterFun) {
        return filterFun(item)
      }
      return true
    })
    // this.total = this.showDatas.length
  }

  @Watch('drawer')
  drawerChange (val: boolean) {
    if (!val) {
      this.row = null
    }
  }
}
