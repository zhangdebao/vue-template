<template>
  <el-submenu v-if="children && children.length > 0" :index="meta.index">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">{{meta.title}}</span>
    </template>
    <my-menu
      v-for="menu of children"
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
import { RouteConfig } from 'vue-router'
const LeftMenu = namespace("leftMenu");
@Component({
  name: 'my-menu'
})
export default class Menu extends Vue {

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
    const { name } = this.$router.currentRoute
    if (Object.is(name, this.name)) {
      return
    }
    this.$router.push({
      name: this.name
    })
  }
}
</script>
<style lang="scss" scoped>
</style>