<template>
  <label
    class="el-checkbox-button"
    :class="[
      size ? 'el-checkbox-button--' + size : '',
      { 'is-disabled': checkboxDisabled },
      { 'is-checked': checked },
      { 'is-focus': focus }
    ]"
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="checkboxDisabled"
  >
    <input
      :checked="checked"
      class="el-checkbox-button__original"
      type="checkbox"
      :name="name"
      :tabindex="tabindex"
      :disabled="checkboxDisabled"
      :true-value="trueValue"
      :false-value="falseValue"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />

    <span
      v-if="$slots.default"
      class="el-checkbox-button__inner"
      :style="checked ? activeStyle : {}"
    >
      <slot></slot>
    </span>
  </label>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { elCheckboxEmits, elCheckboxProps } from './checkbox'
import useCheckbox from './use-checkbox'

export default defineComponent({
  name: 'ElCheckboxButton',

  props: elCheckboxProps,
  emits: elCheckboxEmits,

  setup(props, { emit }) {
    const checkbox = useCheckbox(props, { emit })

    const activeStyle = computed(() => {
      const fillValue = checkbox.group?.fill?.value ?? ''
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: checkbox.group?.textColor?.value ?? '',
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : ''
      }
    })

    return {
      ...useCheckbox(props, { emit }),

      activeStyle
    }
  }
})
</script>
