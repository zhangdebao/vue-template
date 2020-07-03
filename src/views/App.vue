<template lang="html">
  <div id="root">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
