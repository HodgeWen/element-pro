<template>
  <div :class="textareaClass">
    <textarea
      ref="textareaRef"
      class="el-textarea__inner"
      v-bind="$attrs"
      :tabindex="tabindex"
      :disabled="textareaDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="computedTextareaStyle"
      :aria-label="label"
      :placeholder="placeholder"
      v-on="compositionHandlers"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @keydown="onKeydown"
    ></textarea>

    <span v-if="isWordLimitVisible" class="el-input__count">
      {{ textLength }} / {{ $attrs.maxlength }}
    </span>
  </div>
</template>
<script lang="ts">
import { useFormItem } from '@element-pro/hooks'
import isServer from '@element-pro/utils/isServer'
import { StyleValue } from '@element-pro/utils/types'
import { isObject } from 'lodash'
import { defineComponent, nextTick, computed, shallowRef, onMounted, watch } from 'vue'
import { calcTextareaHeight } from './calc-textarea-height'
import { textareaEmits, textareaProps } from './textarea'
import useEvents from './use-events'

export default defineComponent({
  name: 'ElTextarea',

  inheritAttrs: false,

  props: textareaProps,
  emits: textareaEmits,

  setup(props, { emit }) {
    const { size: textareaSize, disabled: textareaDisabled, elFormItem } = useFormItem(props)
    const textareaRef = shallowRef<HTMLTextAreaElement>()

    // 同步组件原生值, 使其受控
    const syncNativeValue = () => {
      nextTick(() => {
        const textarea = textareaRef.value
        const textareaValue = textarea?.value

        if (props.modelValue === textareaValue) return

        textarea!.value = props.modelValue ?? ''
      })
    }

    const _textareaCalcStyle = shallowRef(props.inputStyle)

    const computedTextareaStyle = computed<StyleValue>(() => [
      props.inputStyle,
      _textareaCalcStyle.value,
      { resize: props.resize }
    ])

    const isWordLimitVisible = computed(
      () => props.showWordLimit && !textareaDisabled.value && !props.readonly
    )

    const textLength = computed(() => (props.modelValue ? props.modelValue.length : 0))

    const resizeTextarea = () => {
      const { autosize } = props

      if (isServer) return
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined
        _textareaCalcStyle.value = {
          ...calcTextareaHeight(textareaRef.value!, minRows, maxRows)
        }
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textareaRef.value!).minHeight
        }
      }
    }

    const textareaClass = computed(() => {
      let result = ['el-textarea']

      textareaSize.value && result.push(`el-input--${textareaSize.value}`)
      textareaDisabled.value && result.push('is-disabled')

      return result
    })

    onMounted(() => {
      nextTick(resizeTextarea)
    })

    watch(
      () => props.modelValue,
      () => {
        nextTick(resizeTextarea)
      }
    )

    return {
      // attrs,
      textareaRef,
      isWordLimitVisible,
      textareaDisabled,
      computedTextareaStyle,
      textLength,
      textareaClass,

      ...useEvents(props, {
        elFormItem,
        emit,
        syncNativeValue
      })
    }
  }
})
</script>
