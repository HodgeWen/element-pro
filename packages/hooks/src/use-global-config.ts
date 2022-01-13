import { inject, readonly, shallowReactive } from 'vue'
import { configProviderContextKey } from '@element-pro/tokens'
import type { ConfigProviderContext } from '@element-pro/tokens'
import { ComponentSize } from '@element-pro/utils/types'
import zhCN from '@element-pro/locale/lang/zh-cn'

const defaultConfig: ConfigProviderContext = {
  button: {
    autoInsertSpace: false,
  },
}

export const useGlobalConfig = () =>
  inject(configProviderContextKey, defaultConfig)

const globalConfig = shallowReactive({
  /** 组件尺寸 */
  componentSize: 'medium' as ComponentSize,

  /** 国际化 */
  locale: zhCN



})

export default globalConfig
