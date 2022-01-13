import { defineComponent, h, ref, cloneVNode } from 'vue'
import {
  default as ElPopper,
  popperDefaultProps,
} from '@element-pro/components/popper'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { throwError } from '@element-pro/utils/error'
import { getFirstValidNode } from '@element-pro/utils/vnode'

/**
 * ElTooltip
 * Tooltip is essentially an upper layer for Popper, due to popper has already implemented so many functionalities and Popper is essentially a component shared internally
 * Tooltip also does the API translation work for popper.
 * Tooltip shares the exact same API which v2 has, so that the user should be able to
 */
export default defineComponent({
  name: 'ElTooltip',
  components: {
    ElPopper,
  },
  props: {
    ...popperDefaultProps,
    manual: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      validator: (val: unknown) => {
        return typeof val === 'boolean'
      },
      default: undefined,
    },

    visibleArrow: {
      type: Boolean,
      default: true,
    },
    tabindex: {
      type: [String, Number],
      default: '0',
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    // when manual mode is true, v-model must be passed down
    if (props.manual && typeof props.modelValue === 'undefined') {
      throwError(
        '[ElTooltip]',
        'You need to pass a v-model to el-tooltip when `manual` is true'
      )
    }

    const popper = ref(null)

    const onUpdateVisible = (val) => {
      ctx.emit(UPDATE_MODEL_EVENT, val)
    }

    const updatePopper = () => {
      return popper.value.update()
    }

    return {
      popper,
      onUpdateVisible,
      updatePopper,
    }
  },
  render() {
    const {
      $slots,
      content,
      manual,
      onUpdateVisible,
      showAfter,
      visibleArrow,
      modelValue,
      tabindex,
    } = this

    const throwErrorTip = () => {
      throwError('[ElTooltip]', 'you need to provide a valid default slot.')
    }

    const popper = h(
      ElPopper,
      {
        ...Object.keys(popperDefaultProps).reduce((result, key) => {
          return { ...result, [key]: this[key] }
        }, {}),
        ref: 'popper',
        manualMode: manual,
        showAfter,
        showArrow: visibleArrow,
        visible: modelValue,
        'onUpdate:visible': onUpdateVisible,
      },
      {
        default: () => ($slots.content ? $slots.content() : content),
        trigger: () => {
          if ($slots.default) {
            const firstVnode = getFirstValidNode($slots.default(), 1)
            if (!firstVnode) throwErrorTip()
            return cloneVNode(firstVnode, { tabindex }, true)
          }
          throwErrorTip()
        },
      }
    )

    return popper
  },
})
