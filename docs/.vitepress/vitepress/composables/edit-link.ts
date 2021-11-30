import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLocale } from '../composables/locale'
import { createGitHubUrl, createCrowdinUrl } from '../utils'
import editLinkLocale from '../../i18n/component/edit-link.json'

export function useEditLink() {
  const { page, theme, frontmatter } = useData()
  const lang = 'zh-CN'
  const editLink = useLocale(editLinkLocale)

  const canEditSource = computed(() => false)

  const url = computed(() => {
    if (canEditSource.value) {
      const {
        repo,
        docsDir = '',
        docsBranch = 'dev',
        docsRepo = repo,
        editLinks,
      } = theme.value
      const showEditLink =
        frontmatter.value.editLink != null
          ? frontmatter.value.editLink
          : editLinks
      const { relativePath } = page.value
      if (!showEditLink || !relativePath || !repo) {
        return null
      }
      return createGitHubUrl(
        docsRepo,
        docsDir,
        docsBranch,
        relativePath,
        '',
        ''
      )
    }

    return createCrowdinUrl(lang)
  })
  const text = computed(() => {
    return canEditSource.value
      ? editLink.value['edit-on-github']
      : editLink.value['edit-on-crowdin']
  })

  return {
    url,
    text,
  }
}
