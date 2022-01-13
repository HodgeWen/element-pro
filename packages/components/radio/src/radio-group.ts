import { formCommonProps } from '@element-pro/hooks'
import { radioEmits } from './radio'
import type { ExtractPropTypes } from 'vue'

export const radioGroupProps = {
  ...formCommonProps,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  fill: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  }
}
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits
