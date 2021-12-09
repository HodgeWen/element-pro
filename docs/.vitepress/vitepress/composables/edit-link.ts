import { computed } from 'vue'
import editLink from '../../menus/component/edit-link.json'

export function useEditLink() {
  const canEditSource = computed(() => false)

  const text = computed(() => {
    return canEditSource.value
      ? editLink['edit-on-github']
      : editLink['edit-on-crowdin']
  })

  return {
    text,
  }
}
