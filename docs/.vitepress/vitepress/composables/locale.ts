import { computed } from 'vue'

export const useLocale = (
  localeJson: Record<string, Record<string, string>>
) => {
  const lang = 'zh-CN'
  return computed(() => localeJson[lang])
}
