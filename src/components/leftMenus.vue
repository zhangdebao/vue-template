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
      <Menu :key="item.index" v-bind="item" />
    </template>
  </el-menu>
</template>
<script lang="ts">
import Menu from "./menu.vue";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import VueRouter, { RouteConfig, RouteRecord } from "vue-router";
const LeftMenuStore = namespace("leftMenu");
@Component({
  components: {
    Menu
  }
})
export default class LeftMenu extends Vue {
  @Prop({
    default: false
  })
  public menuOpen!: boolean;

  get getActiveIndex() {
    const matched: Array<RouteRecord> = this.$route.matched;
    const item:
      | {
          meta: {
            index: string;
          };
        }
      | undefined = [...matched].pop();
    return item ? item.meta.index : "";
  }

  get getRoutes(): Array<RouteConfig> {
    const router: any = this.$router;
    const route: Array<RouteConfig> = router.options.routes;
    /* 不使用第一层路由“/” */
    const item0 = route[0];
    let children: Array<RouteConfig> = [];
    if (route && item0.children && item0.children.length) {
      children = item0.children;
    }
    return [...children, ...route.slice(1)];
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
