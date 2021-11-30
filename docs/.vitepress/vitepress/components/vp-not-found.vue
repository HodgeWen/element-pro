<script setup lang="ts">
import { computed } from 'vue'
import localeData from '../../i18n/pages/not-found.json'

const lang = 'zh-CN'

const locale = computed(() => localeData[lang])

const goHome = () => {
  window.location.href = `/${lang}/`
}
</script>

<template>
  <el-result icon="error" :title="locale.title" :sub-title="locale.desc">
    <template #extra>
      <el-button @click="goHome">{{ locale['button-title'] }}</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.el-result {
  height: 100vh;
  width: 100vw;
}
</style>
