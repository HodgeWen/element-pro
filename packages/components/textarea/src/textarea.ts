import { isString } from '@vue/shared'
import { formCommonProps } from '@element-pro/hooks'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import type { StyleValue } from '@element-pro/utils/types'
import type { ExtractPropTypes, PropType } from 'vue'

type AutoSize = { minRows?: number; maxRows?: number } | boolean

export const textareaProps = {
  ...formCommonProps,

  modelValue: {
    type: String,
    default: ''
  },
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    default: 'none'
  },
  autosize: {
    type: [Boolean, Object] as PropType<AutoSize>,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },

  showWordLimit: {
    type: Boolean,
    default: false
  },

  label: {
    type: String
  },
  tabindex: {
    type: [Number, String]
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => ({})
  }
}
export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  keydown: (evt: KeyboardEvent) => evt instanceof KeyboardEvent,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
}
export type TextareaEmits = typeof textareaEmits
