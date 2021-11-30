---
title: 'A Vue 3 UI Framework'
lang: zh-CN
page: true
---

<script setup>

if (typeof window !== 'undefined') {
  const preferredLang = localStorage.getItem('preferred_lang') || 'zh-CN'
  window.location.pathname = `/${preferredLang}/`
}

</script>
