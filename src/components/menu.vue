<template>
  <el-submenu v-if="children && children.length > 0" :index="meta.index">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{meta.title}}</span>
    </template>
    <my-menu
      v-for="menu of children"
      :parent="getParentArray(menu)"
      :key="menu.meta.index"
      v-bind="menu"
    />
  </el-submenu>
  <el-menu-item v-else @click="goPath" :disabled="disabled" :index="meta.index">{{meta.title}}</el-menu-item>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const LeftMenu = namespace("leftMenu");
@Component({
  name: 'my-menu'
})
export default class Menu extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  private parent!: Array<object>;

  @Prop({
    default: ""
  })
  private path!: string;

  @Prop({
    default: ""
  })
  private name!: string;

  @Prop({
    default: {
      title: "",
      index: "1"
    }
  })
  private meta!: {
    index: string;
    title: string;
  };

  @Prop({
    default: false
  })
  private disabled!: boolean;

  @Prop() private component!: object;

  @Prop({
    default: () => []
  })
  private children!: Array<object>;

  @LeftMenu.Action("updateMenus") public updateMenus!: Function;
  @LeftMenu.Action("updateActiveIndex") public updateActiveIndex!: Function;

  goPath() {
    const menu = {
      path: this.path,
      name: this.name,
      meta: this.meta,
      component: this.component,
      children: this.children
    };
    let menus: Array<any> = [];
    if (this.parent) {
      menus = [...this.parent];
    }
    const filter = menus.filter(item => {
      return Object.is(item.meta.index, menu.meta.index);
    });
    if (filter.length === 0) {
      menus.push(menu);
    }
    let path = "";
    if (menus.length > 1) {
      this.parent.forEach((item: any) => {
        path = `${path}/${item.path}`;
      });
    }
    path = `${path}/${this.path}`;
    this.$router.push(path);
  }
  getParentArray(item: any) {
    const parent = [...this.parent];
    if (item.children) {
      parent.push(item);
    }
    return parent;
  }
}
</script>
<style lang="scss" scoped>
</style>