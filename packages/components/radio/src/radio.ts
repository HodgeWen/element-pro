import { ref, computed, inject } from 'vue'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { isBool, isString, isNumber } from '@element-pro/utils/util'
import { radioGroupKey } from '@element-pro/tokens'
import { useFormItem, formCommonProps } from '@element-pro/hooks'
import type { ExtractPropTypes, SetupContext } from 'vue'

export const radioPropsBase = {
  ...formCommonProps,
  label: {
    type: [String, Number, Boolean],
    default: ''
  }
}
export const radioProps = {
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  border: Boolean
}
export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBool(val),
  change: (val: string | number | boolean) => isString(val) || isNumber(val) || isBool(val)
}
export type RadioEmits = typeof radioEmits

export const useRadio = (
  props: { label: RadioProps['label']; modelValue?: RadioProps['modelValue'] },
  emit: SetupContext<RadioEmits>['emit']
) => {
  const radioRef = ref<HTMLInputElement>()
  const radioGroup = inject(radioGroupKey, undefined)
  const isGroup = computed(() => !!radioGroup)
  const modelValue = computed<RadioProps['modelValue']>({
    get() {
      return isGroup.value ? radioGroup!.modelValue : props.modelValue!
    },
    set(val) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
      } else {
        emit(UPDATE_MODEL_EVENT, val)
      }
      radioRef.value!.checked = props.modelValue === props.label
    }
  })

  const { size, disabled } = useFormItem(radioGroup || {})
  const focus = ref(false)
  const tabIndex = computed(() => {
    return disabled.value || (isGroup.value && modelValue.value !== props.label) ? -1 : 0
  })

  return {
    radioRef,
    isGroup,
    radioGroup,
    focus,
    size,
    disabled,
    tabIndex,
    modelValue
  }
}
