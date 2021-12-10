<template>
  <div>
    <el-config-provider :locale="locale">
      <el-color-picker v-model="color" style="vertical-align: middle" />
    </el-config-provider>
    <el-button style="margin-left: 8px; vertical-align: middle" @click="toggle">
      切换语言 {{ locale.name }}
    </el-button>
  </div>
</template>

<script lang="ts">
// import { ConfigProvider } from 'element-pro'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const locale = ref<{
      name: string
      el: Record<string, any>
    }>({
      name: 'zh-cn',
      el: {
        colorpicker: {
          confirm: '确定',
          clear: '清空',
        },
      },
    })

    const color = ref('#f00')

    const toggle = () => {
      if (locale.value.name === 'zh-cn') {
        locale.value = {
          name: 'en',
          el: {
            colorpicker: {
              confirm: 'Confirm',
              clear: 'Clear',
            },
          },
        }
      } else {
        locale.value = {
          name: 'zh-cn',
          el: {
            colorpicker: {
              confirm: '确定',
              clear: '清空',
            },
          },
        }
      }
    }

    return {
      locale,
      toggle,
      color,
    }
  },
})
</script>
