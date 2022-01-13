import {
  SuccessFilled,
  InfoFilled,
  WarningFilled,
  CircleCloseFilled,
  Close,
  Loading,
  CircleCheck,
  CircleClose,
} from '@element-plus/icons'
import { definePropType } from './props'
import type { Component } from 'vue'

export const iconPropType = definePropType<string | Component>([String, Object])

export const CloseComponents = {
  Close,
}

export const TypeComponents = {
  Close,
  SuccessFilled,
  InfoFilled,
  WarningFilled,
  CircleCloseFilled,
}

/** 操作类型相关图标映射 */
export const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
  info: InfoFilled,
}

/** 检验组件相关图标映射 */
export const ValidateComponentsMap = {
  validating: Loading,
  success: CircleCheck,
  error: CircleClose,
}

/** 校验状态 */
export type ValidateStatus = keyof typeof ValidateComponentsMap
