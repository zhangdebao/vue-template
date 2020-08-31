<template>
  <el-container>
    <LeftMenu :menuOpen="menuOpen" />
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div>
          <i
            @click="menuOpen = !menuOpen"
            :class="menuOpen ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item) of getNav"
              :key="item.index"
              @click.native="changeLeftMunus(item)"
              class="breadcrumb-item"
            >{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-avatar>User</el-avatar>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import LeftMenu from "../components/leftMenus.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class"; 
import { RouteRecord } from 'vue-router'
const LeftMenuStore = namespace("leftMenu");
@Component({
  components: {
    LeftMenu
  }
})
export default class Home extends Vue {
  public menuOpen = false;
  changeLeftMunus(item: any): void {
    this.$router.push({
      path: item.path || "/"
    });
  }
  get getNav(): Array<RouteRecord> {
    return this.$route.matched;
  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
}
.el-container {
  height: 100vh;
}
.menu-class {
  background: rgb(191, 203, 217);
}
.el-menu {
  border: none;
}
/deep/ .el-breadcrumb__inner,
.is-link,
.breadcrumb-item {
  color: #303133;
  font-weight: 400;
}
/deep/ .el-breadcrumb__inner {
  color: #303133;
  font-weight: 300;
}
.el-header {
  color: #97a8be;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
  div {
    display: flex;
    align-items: center;
    .el-icon-s-fold,
    .el-icon-s-unfold {
      font-size: 20px;
      padding-right: 15px;
    }
  }
}
.el-aside {
  color: #333;
}
</style>
