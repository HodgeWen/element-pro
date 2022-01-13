import type { InjectionKey, Ref } from 'vue'
import type { ElFormRules } from '@element-pro/components/form/src/form.type'
import type { ElFormProps } from '@element-pro/components/form/src/form'

export interface ElFormItemContext {
  validate(): Promise<boolean | null>
  reset(): void
  clearValidate(): void
}

export interface ElFormContext {
  props: ElFormProps

  formRules: Ref<ElFormRules>
  emit: (evt: 'validate', ...args: any[]) => void
  addFormItem: (field: string, formItem: ElFormItemContext) => void
  deleteFormItem: (field: string) => void
  resetField: (field: string) => void
  validateField: (field: string) => Promise<string | null>

}

export const elFormKey: InjectionKey<ElFormContext> = Symbol('elForm')
export const elFormItemKey: InjectionKey<ElFormItemContext> = Symbol('elFormItem')
