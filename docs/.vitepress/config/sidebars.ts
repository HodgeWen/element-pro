import guideMenus from '../menus/pages/guide.json'
import componentMenus from '../menus/pages/component.json'

export const sidebars = {
  '/guide/': guideMenus,
  '/component/': componentMenus.map((component) => {
    component.children = component.children.map((child) => {
      child.link = `/component${child.link}`
      return child
    })
    return component
  }),
}
