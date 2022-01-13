import { formCommonProps } from '@element-pro/hooks'
import { ColorType } from '@element-pro/utils/types'
import type { ExtractPropTypes, Component, PropType } from 'vue'
import type button from './button.vue'

export const buttonProps = {
  ...formCommonProps,
  type: String as PropType<ColorType>,
  text: Boolean,
  icon: Object as PropType<Component>,
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  loading: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
}

export interface ButtonConfigContext {
  autoInsertSpace?: boolean
}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonType = ColorType
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export type ButtonInstance = InstanceType<typeof button>
