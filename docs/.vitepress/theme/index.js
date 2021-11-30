import ElementPro from 'element-pro'

import VPApp, { globals, NotFound } from '../vitepress'

export default {
  NotFound,
  Layout: VPApp,
  logo: '/images/element-pro-logo-small.svg',
  enhanceApp: ({ app }) => {
    app.use(ElementPro)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
}
