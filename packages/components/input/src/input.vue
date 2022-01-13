<template>
  <div
    :class="[
      'el-input',
      inputSize ? 'el-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'el-input-group': $slots.prepend || $slots.append,
        'el-input-group--append': $slots.append,
        'el-input-group--prepend': $slots.prepend,
        'el-input--prefix': $slots.prefix || prefixIcon,
        'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword,
        'el-input--suffix--password-clear': clearable && showPassword
      },
      $attrs.class
    ]"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- prepend slot -->
    <div v-if="$slots.prepend" class="el-input-group__prepend">
      <slot name="prepend" />
    </div>

    <input
      ref="input"
      class="el-input__inner"
      v-bind="attrs"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : 'text'"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      :aria-label="label"
      :placeholder="placeholder"
      :style="inputStyle"
      v-on="compositionHandlers"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    />

    <!-- prefix slot -->
    <span v-if="$slots.prefix || prefixIcon" class="el-input__prefix">
      <span class="el-input__prefix-inner">
        <slot name="prefix"></slot>
        <el-icon v-if="prefixIcon" class="el-input__icon">
          <component :is="prefixIcon" />
        </el-icon>
      </span>
    </span>

    <!-- suffix slot -->
    <span v-if="suffixVisible" class="el-input__suffix">
      <span class="el-input__suffix-inner">
        <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
          <slot name="suffix"></slot>
          <el-icon v-if="suffixIcon" class="el-input__icon">
            <component :is="suffixIcon" />
          </el-icon>
        </template>
        <el-icon
          v-if="showClear"
          class="el-input__icon el-input__clear"
          @mousedown.prevent
          @click="clear"
        >
          <circle-close />
        </el-icon>
        <el-icon
          v-if="showPwdVisible"
          class="el-input__icon el-input__clear"
          @click="handlePasswordVisible"
        >
          <icon-view />
        </el-icon>
        <span v-if="isWordLimitVisible" class="el-input__count">
          <span class="el-input__count-inner"> {{ textLength }} / {{ attrs.maxlength }} </span>
        </span>
      </span>
    </span>

    <!-- append slot -->
    <div v-if="$slots.append" class="el-input-group__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  ref,
  onMounted,
  onUpdated,
  shallowRef
} from 'vue'
import { CircleClose, View as IconView } from '@element-plus/icons'
import { ElIcon } from '@element-pro/components/icon'
import { useAttrs, useFormItem, usePreventComposition } from '@element-pro/hooks'
import { UPDATE_MODEL_EVENT } from '@element-pro/utils/constants'
import { inputProps, inputEmits } from './input'

import type { StyleValue } from '@element-pro/utils/types'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend'
} as const

export default defineComponent({
  name: 'ElInput',
  components: { ElIcon, CircleClose, IconView },

  inheritAttrs: false,

  props: inputProps,
  emits: inputEmits,

  setup(props, { slots, emit, attrs: rawAttrs }) {
    const instance = getCurrentInstance()!
    const attrs = useAttrs()

    const { size: inputSize, disabled: inputDisabled, elFormItem } = useFormItem(props)

    const input = shallowRef<HTMLInputElement>()

    const focused = ref(false)
    const hovering = ref(false)
    const passwordVisible = ref(false)

    const inputOrTextarea = computed(() => input.value)

    const containerStyle = computed(() => rawAttrs.style as StyleValue)

    const nativeInputValue = computed(() =>
      props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)
    )
    const showClear = computed(
      () =>
        props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (focused.value || hovering.value)
    )
    const showPwdVisible = computed(
      () =>
        props.showPassword &&
        !inputDisabled.value &&
        !props.readonly &&
        (!!nativeInputValue.value || focused.value)
    )
    const isWordLimitVisible = computed(
      () =>
        props.showWordLimit &&
        !!attrs.value.maxlength &&
        !props.password &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword
    )
    const textLength = computed(() => Array.from(nativeInputValue.value).length)
    const inputExceed = computed(
      () =>
        // show exceed style if length of initial value greater then maxlength
        !!isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength)
    )

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const calcIconOffset = (place: 'prefix' | 'suffix') => {
      const { el } = instance.vnode
      if (!el) return
      const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.el-input__${place}`))
      const target = elList.find(item => item.parentNode === el)

      if (!target) return

      const pendant = PENDANT_MAP[place]

      if (slots[pendant]) {
        target.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          el.querySelector(`.el-input-group__${pendant}`).offsetWidth
        }px)`
      } else {
        target.removeAttribute('style')
      }
    }

    const updateIconOffset = () => {
      calcIconOffset('prefix')
      calcIconOffset('suffix')
    }

    const handleInput = (event: Event) => {
      const { value } = event.target as TargetElement

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (composing.value) return

      emit(UPDATE_MODEL_EVENT, value)
      emit('input', value)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue)
    }

    const { composing, ...compositionHandlers } = usePreventComposition(handleInput)

    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value)
    }

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        inputOrTextarea.value?.focus()
      })
    }

    const blur = () => {
      inputOrTextarea.value?.blur()
    }

    const handleFocus = (event: FocusEvent) => {
      focused.value = true
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      focused.value = false
      emit('blur', event)
      if (props.validateEvent) {
        elFormItem?.validate()
      }
    }

    const select = () => {
      inputOrTextarea.value?.select()
    }

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '')
      emit('change', '')
      emit('clear')
      emit('input', '')
    }

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value
      focus()
    }

    const suffixVisible = computed(
      () =>
        !!slots.suffix ||
        !!props.suffixIcon ||
        showClear.value ||
        props.showPassword ||
        isWordLimitVisible.value
    )

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          elFormItem?.validate()
        }
      }
    )

    watch(nativeInputValue, setNativeInputValue)

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
    })

    onUpdated(() => {
      nextTick(updateIconOffset)
    })

    const handleMouseLeave = (evt: MouseEvent) => {
      hovering.value = false
      emit('mouseleave', evt)
    }

    const handleMouseEnter = (evt: MouseEvent) => {
      hovering.value = true
      emit('mouseenter', evt)
    }

    const handleKeydown = (evt: KeyboardEvent) => {
      emit('keydown', evt)
    }

    return {
      input,
      attrs,
      inputSize,
      containerStyle,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      suffixVisible,

      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      compositionHandlers,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      handleMouseLeave,
      handleMouseEnter,
      handleKeydown
    }
  }
})
</script>
