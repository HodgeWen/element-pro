import { inject, computed, PropType } from 'vue'
import { elFormKey, elFormItemKey } from '@element-pro/tokens'

import type { ExtractPropTypes } from 'vue'
import { ComponentSize } from '@element-pro/utils/types'

/** 表单组件通用属性 */
export const formCommonProps = {
  /** 控件尺寸大小 */
  size: String as PropType<ComponentSize>,
  /** 控件 */
  disabled: Boolean,
  /** 字段 */
  field: String,
  /** 字段描述 */
  label: String,
  /** 提示 */
  tip: String
}
export type FormCommonProps = ExtractPropTypes<typeof formCommonProps>

export type LocalFallbacks = {
  size?: FormCommonProps['size']
  disabled?: FormCommonProps['disabled']
}

interface FormItemChildProps {
  size?: ComponentSize
  disabled?: boolean
  [key: string]: any
}

export const useFormItem = (props: FormItemChildProps, fallbacks?: LocalFallbacks) => {
  const elForm = inject(elFormKey, undefined)
  const elFormItem = inject(elFormItemKey, undefined)

  return {
    size: computed(() => {
      return props.size || fallbacks?.size || elForm?.props.size || 'medium'
    }),
    disabled: computed(() => {
      return props.disabled === true || fallbacks?.disabled || elForm?.props.disabled || false
    }),
    elForm,
    elFormItem
  }
}

// <el-form >
//   <el-input name="input" @update:model-value="" />
//
//   <el-select name="select" @update:model-value="" @change="" />
// </el-form>

/**
 * 表单组件通用
 * 值改变时校验 (惰性校验, 实时校验)
 * 通过form组件控制所有组件的disabled, readonly, size
 * 通过与form组件中的model直接进行数据交互
 *
 * 统一具有 change事件
 * 复杂数据统一
 * 表格统一用栅格布局
 * 考虑动态表单的相关功能
 * 列表形式的表单
 * 默认滚动到错误的地方
 *
 */
