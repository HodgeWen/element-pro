import type { InjectionKey, ExtractPropTypes } from 'vue'

import type { configProviderProps } from '@element-pro/components/config-provider/src/config-provider'

export type ConfigProviderContext = ExtractPropTypes<typeof configProviderProps>

export const configProviderContextKey: InjectionKey<ConfigProviderContext> =
  Symbol()
