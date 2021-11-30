import { provide, defineComponent } from 'vue'
import { provideLocale } from '@element-pro/hooks'
import { configProviderContextKey } from '@element-pro/tokens'
import { configProviderProps } from './config-provider'

export const ConfigProvider = defineComponent({
  name: 'ElConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    provideLocale()
    provide(configProviderContextKey, props)
    return () => slots.default?.()
  },
})
