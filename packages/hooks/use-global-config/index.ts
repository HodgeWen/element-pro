import { inject } from 'vue'
import { configProviderContextKey } from '@element-pro/tokens'
import type { ConfigProvdierContext } from '@element-pro/tokens'

const defaultConfig: ConfigProvdierContext = {
  button: {
    autoInsertSpace: false,
  },
}

export const useGlobalConfig = () =>
  inject(configProviderContextKey, defaultConfig)
