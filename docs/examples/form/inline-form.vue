<template>
  <el-form inline :model="formInline" :rules="rules" class="demo-form-inline">
    <el-form-item label="Approved by" prop="user">
      <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="formInline.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },

      rules: {
        user: [{ required: true }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
