<template>
  <button
    ref="buttonRef"
    :class="buttonClass"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <el-icon v-if="loading" class="is-loading">
      <loading />
    </el-icon>
    <el-icon v-else-if="icon">
      <component :is="icon" />
    </el-icon>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, inject, defineComponent, ref, CSSProperties } from 'vue'
import { useCssVar } from '@vueuse/core'
import { Loading } from '@element-plus/icons'
import { ElIcon } from '@element-pro/components/icon'
import { useFormItem } from '@element-pro/hooks'
import { buttonGroupContextKey } from '@element-pro/tokens'

import { lighten, darken } from '@element-pro/utils/color'

import { buttonEmits, buttonProps } from './button'

export default defineComponent({
  name: 'ElButton',

  components: {
    ElIcon,
    Loading,
  },

  props: buttonProps,
  emits: buttonEmits,

  setup(props, { emit, slots }) {
    const buttonRef = ref()
    const buttonGroupContext = inject(buttonGroupContextKey, undefined)

    const { form, size, disabled } = useFormItem(props, {
      size: buttonGroupContext?.size,
    })
    const buttonType = computed(
      () => props.type || buttonGroupContext?.type || 'default'
    )

    // 计算悬浮和点击样式
    const typeColor = useCssVar(`--el-color-${props.type}`)
    const buttonStyle = computed(() => {
      let styles: Record<string, any> = {}

      const buttonColor = props.color || typeColor.value

      if (buttonColor) {
        const darkenBgColor = darken(buttonColor, 0.1)
        if (props.plain) {
          styles = {
            '--el-button-bg-color': lighten(buttonColor, 0.9),
            '--el-button-text-color': buttonColor,
            '--el-button-hover-text-color': 'var(--el-color-white)',
            '--el-button-hover-bg-color': buttonColor,
            '--el-button-hover-border-color': buttonColor,
            '--el-button-active-bg-color': darkenBgColor,
            '--el-button-active-text-color': 'var(--el-color-white)',
            '--el-button-active-border-color': darkenBgColor,
          }
        } else {
          const lightenBgColor = lighten(buttonColor)
          styles = {
            '--el-button-bg-color': buttonColor,
            '--el-button-border-color': buttonColor,
            '--el-button-hover-bg-color': lightenBgColor,
            '--el-button-hover-border-color': lightenBgColor,
            '--el-button-active-bg-color': darkenBgColor,
            '--el-button-active-border-color': darkenBgColor,
          }
        }

        if (disabled.value) {
          const disabledButtonColor = lighten(buttonColor, 0.5)
          styles['--el-button-disabled-bg-color'] = disabledButtonColor
          styles['--el-button-disabled-border-color'] = disabledButtonColor
        }
      }

      return styles
    })

    // 得到按钮样式
    const buttonClass = computed(() => {
      let result = `el-button el-button--${buttonType.value} el-button--${size.value}`

      let status: string = [
        ['is-disabled', disabled.value],
        ['is-loading', props.loading],
        ['is-plain', props.plain],
        ['is-round', props.round],
        ['is-circle', props.circle],
        ['is-text-button', props.text]
      ]
        .filter((item) => item[1])
        .map((item) => item[0])
        .join(' ')
      return result + ' ' + status
    })

    const handleClick = (evt: MouseEvent) => {
      if (props.nativeType === 'reset') {
        form?.resetFields()
      }
      emit('click', evt)
    }

    return {
      buttonRef,
      buttonStyle,
      buttonClass,

      size,
      buttonType,
      disabled,

      handleClick,
    }
  },
})
</script>
