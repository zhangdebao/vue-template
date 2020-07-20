<template>
  <el-menu
    :default-active="getActiveIndex"
    text-color="rgb(191, 203, 217)"
    active-text-color="rgb(64, 158, 255)"
    background-color="#304156"
    class="el-menu-vertical-demo"
    :collapse="menuOpen"
  >
    <template v-for="item of getRoutes">
      <Menu :key="item.index" v-bind="item"/>
    </template>
  </el-menu>
</template>
<script lang="ts">
import Menu from './menu.vue'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const LeftMenuStore = namespace('leftMenu')
@Component({
  components: {
    Menu
  }
})
export default class LeftMenu extends Vue {
  @Prop({
    default: false
  }) public menuOpen !: boolean

  @LeftMenuStore.Action('updateMenus') public updateMenus!: Function
  @LeftMenuStore.Action('updateActiveIndex') public updateActiveIndex!: Function
  @LeftMenuStore.Getter('getLeftMenus') public getLeftMenus!: Array<object>
  @LeftMenuStore.Getter('getActiveIndex') public getActiveIndex !: string
  changeLeftMunus (_index: number) {
    let index1 = 0
    this.getLeftMenus.forEach((item: any, index: number) => {
      if (Object.is(item.index, _index)) {
        index1 = index + 1
      }
    })
    const menus = Object.assign([], this.getLeftMenus).slice(0, index1)
    this.updateMenus(menus)
  }

  goPath (menus: Array<object>, path: string, index: number) {
    this.updateMenus(menus)
    this.updateActiveIndex(index)
    this.$router.push(path)
  }

  get getRoutes () {
    const router: any = this.$router
    const route = router.options.routes
    /* 不使用第一层路由“/” */
    return [
      ...route[0].children
    ]
    // return this.$router.options.routes
  }
}
</script>
<style lang="scss" scoped>
.menu-class {
  background: rgb(191, 203, 217);
}
.el-menu {
  border: none;
}
</style>
