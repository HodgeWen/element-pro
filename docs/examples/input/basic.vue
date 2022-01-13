<template>
  <el-input placeholder="未绑定无法输入" />
  <el-divider />
  <el-input v-model="input" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      input: ref('')
    }
  }
})
</script>
