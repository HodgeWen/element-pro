import { useFormItem } from '@element-pro/hooks'
import { ElFormItemContext } from '@element-pro/tokens'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { ComponentSize, Emitter } from '@element-pro/utils/types'
import { computed, inject, ref, Ref, watch } from 'vue'
import { ElCheckboxEmits, ElCheckboxProps } from './checkbox'

interface CheckboxContext {
  emit: Emitter<ElCheckboxEmits>
}
export default function useCheckbox(props: ElCheckboxProps, context: CheckboxContext) {
  const { emit } = context

  let elFormItem: ElFormItemContext | undefined = undefined
  let checkboxDisabled: Ref<boolean>
  let checkboxSize: Ref<ComponentSize>

  // 判断是否处于复选框组中
  const group = inject<Record<string, any> | undefined>('CheckboxGroup', undefined)

  if (group) {
    checkboxSize = group.elCheckboxGroupSize
    checkboxDisabled = group.elCheckboxGroupDisabled
  } else {
    const formItem = useFormItem(props)
    elFormItem = formItem.elFormItem
    checkboxDisabled = formItem.disabled
    checkboxSize = formItem.size
  }

  const checked = computed(() => {
    if (group) return group.props.modelValue.includes(props.value)

    const { modelValue, value, trueValue } = props
    if (typeof modelValue === 'boolean') return modelValue
    if (Array.isArray(modelValue)) return modelValue.includes(value)
    return modelValue === trueValue ? true : false
  })

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement

    // 触发复选框组中的事件
    if (group) {
      return group.handleChange(target.checked, props.value)
    }

    const { modelValue, value } = props

    if (Array.isArray(modelValue)) {
      if (!value) return

      if (target.checked) {
        emit(UPDATE_MODEL_EVENT, modelValue.concat(props.value))
      } else {
        let i = modelValue.findIndex(v => v === props.value)
        emit(UPDATE_MODEL_EVENT, modelValue.slice(0, i).concat(modelValue.slice(i + 1)))
      }
      return
    }

    if (target.checked) {
      emit(UPDATE_MODEL_EVENT, props.trueValue !== undefined ? props.trueValue : true)
    } else {
      emit(UPDATE_MODEL_EVENT, props.falseValue !== undefined ? props.falseValue : false)
    }
  }

  const focus = ref(false)

  if (elFormItem) {
    watch(
      () => props.modelValue,
      v => {
        elFormItem!.validate()
      }
    )
  }

  return {
    checked,
    group,
    checkboxDisabled,
    checkboxSize,
    handleChange,
    focus
  }
}
