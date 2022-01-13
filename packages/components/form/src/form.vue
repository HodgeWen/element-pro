<template>
  <el-grid
    tag="form"
    class="el-form"
    :cols="cols || 1"
    :class="[labelPosition ? 'el-form--label-' + labelPosition : '']"
  >
    <component v-for="node of getSlots()" :is="node" />
  </el-grid>
</template>

<script lang="ts">
import { ElFormItem, ElGrid } from '@element-pro/components'
import { cloneVNode, computed, defineComponent, h, provide, shallowReactive } from 'vue'
import { elFormKey } from '@element-pro/tokens'
import type { ElFormItemContext as FormItemCtx } from '@element-pro/tokens'
import { elFormComponents, elFormProps } from './form'
import { omit } from 'lodash'
import type { ElFormRules } from './form'
import { validators } from './form-validator'

type RuleType = keyof ElFormRules[string]

export default defineComponent({
  name: 'ElForm',

  components: {
    ElGrid
  },

  props: elFormProps,
  emits: ['validate'],

  setup(props, { emit, slots }) {
    const formItems: Record<string, FormItemCtx> = {}

    // 默认表单值
    const defaultFormValues = computed(() => {
      let result: Record<string, any> = {}
      if (props.model) {
        Object.keys(props.model).forEach(name => {
          result[name] = props.model![name].value
        })
      }
      return result
    })

    // 表单值
    const formValues = computed(() => {
      return shallowReactive({ ...defaultFormValues.value })
    })

    // 校验规则
    const formRules = computed(() => {
      let result: ElFormRules = {}
      if (props.model) {
        Object.keys(props.model).forEach(name => {
          result[name] = omit(props.model![name], ['value'])
        })
      }
      return result
    })

    const getSlots = () => {
      let _formValues = formValues.value
      const vNodeList = slots.default?.(_formValues) || []

      return vNodeList.map(node => {
        if (typeof node.type === 'object' && elFormComponents.has((node.type as any).name)) {
          const { label, field, tips } = node.props || {}

          if (!field) return node

          const update = (value: any) => {
            _formValues[field] = value
          }
          return h(
            ElFormItem,
            {
              label,
              field,
              tips
            },
            () => {
              let cloned = cloneVNode(node, {
                modelValue: _formValues[field],
                'onUpdate:modelValue': update
              })
              return cloned
            }
          )
        }

        return node
      })
    }

    // 添加和删除表单项
    const addFormItem = (name: string, formItem: FormItemCtx) => {
      formItems[name] = formItem
    }
    const deleteFormItem = (name: string) => {
      delete formItems[name]
    }

    const resetField = (field: string) => {
      formValues.value[field] = defaultFormValues.value[field]
    }

    const resetFields = () => {
      Object.values(formItems).forEach(formItem => formItem.reset())
    }

    // 清除校验
    const clearValidate = (fields?: string | string[]) => {
      if (!fields) {
        Object.values(formItems).forEach(formItem => formItem.clearValidate())
      } else if (typeof fields === 'string') {
        formItems[fields].clearValidate()
      } else {
        fields.forEach(field => formItems[field].clearValidate())
      }
    }

    /**
     * 单个字段校验
     * @param field 需要校验的字段
     */
    const validateField = async (field: string) => {
      let value = formValues.value[field]
      let rule = formRules.value[field]
      const ruleTypes = Object.keys(rule)

      let i = -1,
        len = ruleTypes.length

      while (++i < len) {
        let ruleType = ruleTypes[i] as RuleType

        // 自定义校验器
        if (ruleType === 'validator') {
          let errMsg = await rule.validator?.(value, formValues.value, rule)
          if (errMsg) return errMsg
        } else {
          // 预置校验
          let errMsg = validators[ruleType](value, rule[ruleType] as any)
          if (errMsg) return errMsg
        }
      }

      return null
    }

    /** 校验 */
    const validate = async (fields?: string | string[]) => {
      if (!fields || Array.isArray(fields)) {
        const allValidation = await Promise.all(
          (Array.isArray(fields) ? fields : Object.keys(formItems)).map(name =>
            formItems[name].validate()
          )
        )
        return allValidation.every(valid => valid)
      }
      if (typeof fields === 'string') {
        return formItems[fields].validate()
      }

      return true
    }

    const setValue = (values: Record<string, any>) => {
      for (const key in values) {
        formValues.value[key] = values[key]
      }
    }

    const elForm = {
      props,

      formRules,
      resetField,
      emit,
      addFormItem,
      deleteFormItem,
      validateField
    }

    provide(elFormKey, elForm)

    return {
      validate, // export
      resetFields,
      clearValidate,
      getSlots,
      setValue
    }
  }
})
</script>
