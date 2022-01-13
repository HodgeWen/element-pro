import { Emitter } from '@element-pro/utils/types'
import { ref } from 'vue'
import { TextareaEmits, TextareaProps } from './textarea'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { ElFormItemContext } from '@element-pro/tokens'
import { usePreventComposition } from '@element-pro/hooks'

interface EventContext {
  emit: Emitter<TextareaEmits>
  syncNativeValue: () => void
  elFormItem?: ElFormItemContext
}

/**
 * 使用组件的事件
 * @param props 组件属性
 * @param context 组件上下文
 */
export default function useEvents(props: TextareaProps, context: EventContext) {
  const { emit, syncNativeValue, elFormItem } = context

  const onInput = (event: Event) => {
    const { value } = event.target as HTMLTextAreaElement

    if (composing.value) return

    emit(UPDATE_MODEL_EVENT, value)
    emit('input', value)
    syncNativeValue()
  }
  const onChange = (event: Event) => {
    emit('change', (event.target as HTMLTextAreaElement).value)
  }
  const onFocus = (event: FocusEvent) => {
    emit('focus', event)
  }
  const onBlur = (event: FocusEvent) => {
    emit('blur', event)
    elFormItem?.validate()
  }
  const onKeydown = (event: KeyboardEvent) => emit('keydown', event)

  const { composing, ...compositionHandlers } = usePreventComposition(onInput)

  return {
    onInput,
    onFocus,
    onBlur,
    onChange,
    onKeydown,

    compositionHandlers
  }
}
