import { ref } from 'vue'

export const usePreventComposition = (endCallback?: (ev: Event) => void) => {
  let composing = ref(false)

  const compositionstart = (ev: CompositionEvent) => {
    composing.value = true
  }

  const compositionend = (ev: CompositionEvent) => {
    if (composing.value) {
      composing.value = false
      endCallback?.(ev)
    }
  }

  return {
    composing,
    compositionstart,
    compositionend
  }
}
