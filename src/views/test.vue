<template lang="html">
  <div class="test">
    <Button>element-ui</Button>
  </div>
</template>

<script>
import { Button } from 'element-ui'
export default {
  components: {
    'el-button': Button
  }
}
</script>

<style lang="scss" scoped>
.test{
  color: red;
}
</style>
