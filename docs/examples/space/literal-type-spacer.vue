<template>
  <el-space :size="size" spacer="|">
    <div v-for="i in 2" :key="i">
      <el-button> button {{ i }} </el-button>
    </div>
  </el-space>
</template>

<script lang="ts">
export default {
  data() {
    return {
      size: 10,
    }
  },
}
</script>
