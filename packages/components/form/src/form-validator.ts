import type { ElFormRules, ModelValue } from './form'

/** 校验器 */
export const validators = {
  required(value: any, required: any) {
    if (!required) return null

    let msg = '该项是必填项'

    if (Array.isArray(value) && value.length < 1) {
      return msg
    }

    let type = typeof value

    if (type === 'string' && !value) {
      return msg
    }
    if (value === null || value === undefined) {
      return msg
    }

    return null
  },

  min(value: string | number | any[], min: number) {
    let type = typeof value
    if (!(Array.isArray(value) || type === 'number' || type === 'string')) {
      return `该项的类型应为: [string | number | Array], 而不是: ${type}`
    }

    if (type === 'number' && value < min) {
      return `该项的最小值应为: ${min}, 而不是: ${min}`
    }
    if ((type === 'string' || Array.isArray(value)) && (value as any).length < min) {
      return `该项的最小长度应为: ${min}, 而不是: ${min}`
    }

    return null
  },
  max(value: ModelValue, max: number) {
    let type = typeof value
    if (!(Array.isArray(value) || type === 'number' || type === 'string')) {
      return `该项的类型应为: [string | number | Array], 而不是: ${type}`
    }

    if (type === 'number' && value > max) {
      return `该项的最大值应为: ${max}, 而不是: ${value}`
    }
    if ((type === 'string' || Array.isArray(value)) && (value as any).length > max) {
      return `该项的最大长度应为:  ${max}, 而不是: ${(value as any).length}`
    }

    return null
  },
  len(value: string | any[], lenth: number) {
    let type = typeof value

    if (!(Array.isArray(value) || type === 'string')) {
      return `该项的类型应为: [string | Array], 而不是: ${type}`
    }

    if (value.length > lenth) {
      return `该项的长度应为: ${lenth}, 而不是: ${value.length}`
    }

    return null
  },
  match(value: string, pattern: RegExp) {
    let type = typeof value
    if (type !== 'string') {
      return `该项的类型应为: [string], 而不是: ${type}`
    }

    if (!pattern.test(value)) {
      return `该项不匹配正则表达式: ${pattern}`
    }

    return null
  }
}

/**
 * 表单校验
 * @param model 所有数据模型
 * @param rules 所有表单的校验规则
 * @param fields 指定校验的字段
 */
export async function validate(model: Record<string, any>, rules: ElFormRules, fields?: string[]) {
  if (fields) {
    fields.forEach(field => {
      model[field]
    })
  }
}
