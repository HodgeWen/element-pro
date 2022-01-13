<template>
  <el-form ref="ruleForm" :model="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-input clearable label="Activity name" field="name"></el-input>

    <el-select placeholder="Activity zone" label="Activity zone" field="region">
      <el-option label="Zone one" value="shanghai"></el-option>
      <el-option label="Zone two" value="beijing"></el-option>
    </el-select>

    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-form-item field="date1">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item field="date2">
          <el-time-picker placeholder="Pick a time" style="width: 100%"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-switch label="Instant delivery" field="delivery" />

    <el-checkbox-group label="Activity type" field="type">
      <el-checkbox label="Online activities" name="type"></el-checkbox>
      <el-checkbox label="Promotion activities" name="type"></el-checkbox>
      <el-checkbox label="Offline activities" name="type"></el-checkbox>
      <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
    </el-checkbox-group>

    <el-radio-group label="Resources" field="resource">
      <el-radio label="Sponsorship"></el-radio>
      <el-radio label="Venue"></el-radio>
    </el-radio-group>

    <el-input label="Activity form" field="desc" type="textarea"></el-input>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      ruleForm: {
        name: {
          value: '',
          required: true,
          min: 3,
          max: 5
        },
        region: {
          value: '',
          required: true
        },
        date1: {
          value: '',
          required: true
        },
        date2: {
          value: '',
          required: true
        },
        delivery: false,
        type: {
          value: [],
          required: true
        },
        resource: {
          value: '',
          required: true
        },
        desc: {
          required: true,
          value: ''
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
