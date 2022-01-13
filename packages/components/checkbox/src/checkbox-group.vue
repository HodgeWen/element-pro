<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, provide, nextTick } from 'vue'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { isValidComponentSize } from '@element-pro/utils/validators'

import type { PropType } from 'vue'
import type { ComponentSize } from '@element-pro/utils/types'
import { useFormItem } from '@element-pro/hooks'

export default defineComponent({
  name: 'ElCheckboxGroup',

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,

    max: {
      type: Number,
      default: undefined
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: isValidComponentSize
    },
    fill: {
      type: String,
      default: undefined
    },
    textColor: {
      type: String,
      default: undefined
    }
  },

  emits: [UPDATE_MODEL_EVENT, 'change'],

  setup(props, { emit }) {
    const {
      elFormItem,
      size: elCheckboxGroupSize,
      disabled: elCheckboxGroupDisabled
    } = useFormItem(props)

    const handleChange = (checked: boolean, value: any) => {
      const { modelValue } = props
      let result: any[]
      if (checked) {
        result = modelValue.concat(value)
      } else {
        let i = modelValue.findIndex(mv => mv === value)
        result = modelValue.slice(0, i).concat(modelValue.slice(i + 1))
      }
      emit(UPDATE_MODEL_EVENT, result)
      nextTick(() => {
        emit('change', result)
      })
    }

    provide('CheckboxGroup', {
      name: 'ElCheckboxGroup',
      props,
      elCheckboxGroupSize,
      elCheckboxGroupDisabled,
      handleChange
    })

    watch(
      () => props.modelValue,
      () => {
        elFormItem?.validate()
      }
    )
  }
})
</script>
