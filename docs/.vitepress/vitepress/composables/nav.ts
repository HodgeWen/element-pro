import { computed } from 'vue'
import { useData } from 'vitepress'

export const useNav = () => {
  const { theme } = useData()
  const lang = 'zh-CN'
  return computed(() => {
    return theme.value.nav[lang].filter((v) => v.text !== '旧版文档')
  })
}
