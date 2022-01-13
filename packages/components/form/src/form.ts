import { ComponentSize } from "@element-pro/utils/types"
import { ExtractPropTypes, PropType } from "vue"

export type ModelValue = string | number | any[] | boolean

export interface ElFormModelItem {
  /** 表单默认值 */
  value?: any;

  /** 必填 */
  required?: boolean
  /** 指定长度 */
  len?: number;
  /** 最小值或最小长度 */
  min?: number;
  /** 最大值或最大长度 */
  max?: number;
  /** 匹配正则表达式 */
  match?: RegExp
  /** 自定义验证器 */
  validator?(value: any, model: Record<string, any>, rule: ElFormRules[string]): string | Promise<string>
}

export type ElFormRules = Record<string, Omit<ElFormModelItem, 'value'>>


export type ElFormModel = Record<string, ElFormModelItem>

export const elFormProps = {
  model: {
    type: Object as PropType<ElFormModel>
  },
  labelPosition: String as PropType<'left' | 'right' | 'top'>,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  cols: {
    type: Number
  },
  size: String as PropType<ComponentSize>,
  disabled: Boolean
}

export type ElFormProps = ExtractPropTypes<typeof elFormProps>

export const elFormComponents = new Set([
  'ElInput', 'ElTextarea', 'ElSwitch', 'ElSelect', 'ElDatePicker', 'ElTimePicker',
  'ElSlider', 'ElCascader', 'ElCheckbox', 'ElCheckboxGroup', 'ElRadio', 'ElRadioGroup'
])