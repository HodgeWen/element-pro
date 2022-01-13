import { isString } from '@vue/shared'
import { formCommonProps } from '@element-pro/hooks'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import type { StyleValue } from '@element-pro/utils/types'
import type { ExtractPropTypes, Component, PropType } from 'vue'

type AutoSize = { minRows?: number; maxRows?: number } | boolean

export const inputProps = {
  ...formCommonProps,
  modelValue: {
    type: [String, Number] as PropType<string | number | null | undefined>,
    default: ''
  },
  password: {
    type: Boolean
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
  form: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  // TODO 应该 只能传入组件, 同时应该考虑到动态表单的
  suffixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ''
  },
  prefixIcon: {
    type: [String, Object] as PropType<string | Component>,
    default: ''
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
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
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
export type InputEmits = typeof inputEmits
