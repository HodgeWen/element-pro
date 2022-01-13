<template>
  <label
    class="el-checkbox"
    :class="[
      'el-checkbox--' + checkboxSize,
      { 'is-disabled': checkboxDisabled },
      { 'is-bordered': border },
      { 'is-checked': checked }
    ]"
    :aria-controls="indeterminate ? controls : undefined"
  >
    <span
      class="el-checkbox__input"
      :class="{
        'is-disabled': checkboxDisabled,
        'is-checked': checked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
      :tabindex="indeterminate ? 0 : undefined"
      :role="indeterminate ? 'checkbox' : undefined"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="el-checkbox__inner"></span>
      <input
        :checked="checked"
        class="el-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :tabindex="tabindex"
        :disabled="checkboxDisabled"
        :true-value="trueValue"
        :false-value="falseValue"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span v-if="$slots.default" class="el-checkbox__label">
      <slot />
    </span>
  </label>
</template>
<script lang="ts">
import { defineComponent} from 'vue'

import { elCheckboxEmits, elCheckboxProps } from './checkbox'
import useCheckbox from './use-checkbox'

export default defineComponent({
  name: 'ElCheckbox',

  props: elCheckboxProps,
  emits: elCheckboxEmits,

  setup(props, { emit }) {
    return useCheckbox(props, { emit })
  }
})
</script>
