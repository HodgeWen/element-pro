import { resolve } from 'path'

/** 项目根路径 */
export const projRoot = resolve(__dirname, '..', '..')

/** 项目包路径 /packages/ */
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')

/** element pro包的目录 /packages/element-pro */
export const epRoot = resolve(pkgRoot, 'element-pro')
export const utilRoot = resolve(pkgRoot, 'utils')
export const docRoot = resolve(projRoot, 'docs')

/** dist */
export const buildOutput = resolve(projRoot, 'dist')
/** dist/element-pro */
export const epOutput = buildOutput

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hookPackage = resolve(hookRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivePackage = resolve(directiveRoot, 'package.json')
export const epPackage = resolve(epRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
export const docPackage = resolve(docRoot, 'package.json')
