import type { TypeComponentsMap } from '@element-pro/utils/icon'
import type { ExtractPropTypes, PropType } from 'vue'

export type AlertEffect = 'light' | 'dark'

export const alertProps = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<keyof typeof TypeComponentsMap>,
    default: 'info',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeText: {
    type: String,
    default: '',
  },
  showIcon: Boolean,
  center: Boolean,
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
}
export type AlertProps = ExtractPropTypes<typeof alertProps>

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type AlertEmits = typeof alertEmits
