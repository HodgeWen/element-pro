import type { ExtractPropTypes, PropType } from 'vue'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { ComponentSize } from '@element-pro/utils/types'
import { isValidComponentSize } from '@element-pro/utils/validators'

export const elCheckboxProps = {
  // 默认单个为布尔值来控制
  modelValue: {
    type: [Boolean, Array, Number, String] as PropType<boolean | string | number | any[]>,
    default: false
  },
  value: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  name: {
    type: String,
    default: undefined
  },
  trueValue: {
    type: [String, Number],
    default: undefined
  },
  falseValue: {
    type: [String, Number],
    default: undefined
  },
  controls: {
    type: String,
    default: undefined
  },
  border: Boolean,
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize
  },
  tabindex: [String, Number]
}

export type ElCheckboxProps = ExtractPropTypes<typeof elCheckboxProps>

export const elCheckboxEmits = {
  [UPDATE_MODEL_EVENT](modelValue: boolean | string | number | any[]) {
    return true
  }
}

export type ElCheckboxEmits = typeof elCheckboxEmits
