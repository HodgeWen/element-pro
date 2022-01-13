<template>
  <div>列数</div>
  <el-slider :min="1" :max="6" v-model="cols"></el-slider>

  <div>列间隔</div>
  <el-slider :min="0" :max="32" v-model="columnGap" />

  <div>行间隔</div>
  <el-slider :min="0" :max="32" v-model="rowGap" />

  <el-grid :cols="cols" :gap="gap">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </el-grid>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const cols = ref(3)
const rowGap = ref(8)
const columnGap = ref(12)
const gap = computed(() => `${rowGap.value},${columnGap.value}`)
</script>

<style>
.el-grid div {
  background-color: #ccc;
  height: 36px;
  border-radius: 4px;
  background-color: #d3dce6;
}
</style>
