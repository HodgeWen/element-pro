import type { ExtractPropTypes, PropType } from 'vue'
import type { ZIndexProperty } from 'csstype'

export const affixProps = {
  zIndex: {
    type: [Number, String] as PropType<ZIndexProperty>,
    default: 100,
  },
  target: {
    type: String,
    default: '',
  },
  offset: {
    type: Number,
    default: 0,
  },
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
}

export type AffixProps = ExtractPropTypes<typeof affixProps>

export const affixEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    typeof scrollTop === 'number' && typeof fixed === 'boolean',
  change: (fixed: boolean) => typeof fixed === 'boolean',
}

export type AffixEmits = typeof affixEmits
