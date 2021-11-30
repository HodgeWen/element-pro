import { computed } from 'vue'
import { useRouter, useRoute } from 'vitepress'
import { PREFERRED_LANG_KEY } from '../constant'

import langs from '../../i18n/lang.json'
import translationLocale from '../../i18n/component/translation.json'

export const useTranslation = () => {
  const route = useRoute()
  const router = useRouter()
  const lang = 'zh-CN'

  const languageMap = {
    'en-US': 'English',
    'zh-CN': '中文',
    'es-ES': 'Español',
    'fr-FR': 'Français',
    'ja-JP': '日本語',
  }

  const helpTranslate = computed(() => translationLocale[lang].help)
  const langsRef = computed(() => {
    const currentLang = lang

    // When there is no zh-CN in the list, meaning this is the PR preview
    // so we simply return the current list which contains only zh-CN
    if (!langs.includes('zh-CN')) return []
    const langsCopy = langs.slice(0)
    langsCopy.splice(langsCopy.indexOf(currentLang), 1)

    // if current language is not zh-CN, then zh-CN needs to be moved to the head.
    if (currentLang !== 'zh-CN') {
      langsCopy.splice(langsCopy.indexOf('zh-CN'), 1)
    }

    return currentLang === 'zh-CN' ? langsCopy : ['zh-CN'].concat(langsCopy)
  })

  const switchLang = (targetLang: string) => {
    if (lang === targetLang) return
    localStorage.setItem(PREFERRED_LANG_KEY, targetLang)
    const firstSlash = route.path.indexOf('/', 1)

    const goTo = `/${targetLang}/${route.path.slice(firstSlash + 1)}`

    router.go(goTo)
  }

  return {
    helpTranslate,
    languageMap,
    langs: langsRef,
    lang,
    switchLang,
  }
}
