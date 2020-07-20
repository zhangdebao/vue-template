<template>
  <el-submenu v-if="children && children.length > 0" :index="index">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{title}}</span>
    </template>
    <Menu v-for="menu of children" :parent="{
      path,
      name,
      title,
      index,
      component
    }" :key="menu.index" v-bind="menu" />
  </el-submenu>
  <el-menu-item v-else @click="goPath" :disabled="disabled" :index="index">{{title}}</el-menu-item>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const LeftMenu = namespace('leftMenu')
@Component
export default class Menu extends Vue {
  @Prop({
    default: () => {
      return {
        path: ''
      }
    }
  }) private parent?: {
    path: string;
  }

  @Prop({
    default: ''
  }) private path!: string

   @Prop({
     default: ''
   }) private name!: string

  @Prop({
    default: ''
  }) private title!: string

  @Prop({
    default: ''
  }) private index!: string

   @Prop({
     default: false
   }) private disabled!: boolean

  @Prop() private component!: object

  @Prop({
    default: () => []
  }) private children!: Array<object>

  @LeftMenu.Action('updateMenus') public updateMenus!: Function
  @LeftMenu.Action('updateActiveIndex') public updateActiveIndex!: Function

  goPath () {
    const menu = {
      path: this.path,
      name: this.name,
      title: this.title,
      index: this.index,
      component: this.component,
      children: this.children
    }
    const menus = []
    if (this.parent) {
      menus.push(this.parent)
    }
    menus.push(menu)
    this.updateMenus(menus)
    this.updateActiveIndex(this.index)
    let path = this.path
    if (this.parent && this.$route.path.indexOf(this.parent.path) === -1) {
      path = `/${this.parent.path}/${path}`
    }
    this.$router.push(path)
  }
}
</script>
<style lang="scss" scoped>
</style>
