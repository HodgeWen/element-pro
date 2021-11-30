import { useLocaleProps } from '@element-pro/hooks'
import { buildProp, definePropType, mutable } from '@element-pro/utils/props'
import type { ButtonConfigContext } from '@element-pro/components/button'

export const configProviderProps = {
  ...useLocaleProps,
  // Add more configs
  button: buildProp({
    type: definePropType<ButtonConfigContext>(Object),
    default: () => {
      return mutable({
        autoInsertSpace: true,
      } as const)
    },
  }),
}
