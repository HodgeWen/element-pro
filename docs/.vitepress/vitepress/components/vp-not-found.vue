<script setup lang="ts">
import notFoundData from '../../menus/pages/not-found.json'

const goHome = () => {
  window.location.href = `/`
}
</script>

<template>
  <el-result
    icon="error"
    :title="notFoundData.title"
    :sub-title="notFoundData.desc"
  >
    <template #extra>
      <el-button @click="goHome">{{ notFoundData['button-title'] }}</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
