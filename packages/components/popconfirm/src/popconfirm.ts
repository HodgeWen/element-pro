import { QuestionFilled } from '@element-plus/icons'
import { ColorType } from '@element-pro/utils/types'

import type { ButtonHTMLAttributes, Component, ExtractPropTypes, PropType } from 'vue'

export const popconfirmProps = {
  title: {
    type: String,
  },
  confirmButtonText: {
    type: String,
  },
  cancelButtonText: {
    type: String,
  },
  confirmButtonType: {
    type: String as PropType<ColorType>,
    default: 'primary',
  },
  cancelButtonType: {
    type: String as PropType<ColorType>
  },
  icon: {
    type: [Object, String] as PropType<Component | string>,
    default: QuestionFilled as any,
  },
  iconColor: {
    type: String,
    default: '#f90',
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
}
export type PopconfirmProps = ExtractPropTypes<typeof popconfirmProps>

export const popconfirmEmits = {
  confirm: () => true,
  cancel: () => true,
}
export type PopconfirmEmits = typeof popconfirmEmits
