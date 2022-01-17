import type { CSSProperties, Plugin } from 'vue'

type OptionalKeys<T extends Record<string, unknown>> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K
}[keyof T]

type RequiredKeys<T extends Record<string, unknown>> = Exclude<keyof T, OptionalKeys<T>>

type MonoArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg?: T[K]) => void

type BiArgEmitter<T, Keys extends keyof T> = <K extends Keys>(evt: K, arg: T[K]) => void

export type EventEmitter<T extends Record<string, unknown>> = MonoArgEmitter<T, OptionalKeys<T>> &
  BiArgEmitter<T, RequiredKeys<T>>

export type AnyFunction<T> = (...args: any[]) => T

export type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<ReturnType<T>>

export type SFCWithInstall<T> = T & Plugin

export type Nullable<T> = T | null

export type RefElement = Nullable<HTMLElement>

export type CustomizedHTMLElement<T> = HTMLElement & T

export type Indexable<T> = {
  [key: string]: T
}

export type Hash<T> = Indexable<T>

export type TimeoutHandle = ReturnType<typeof global.setTimeout>

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export type ColorType = 'primary' | 'success' | 'info' | 'warning' | 'danger'

export type StyleValue = string | CSSProperties | Array<StyleValue>

export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

type EmitsObject = Record<string, ((...args: any[]) => any) | null>

/**
 * 联合类型转为交叉类型 vue/runtime-core.d.ts
 * 1. 多个联合类型不是索引类型和函数类型, 会直接得到 never, string & number -> never
 * 2. 索引类型, 如果索引类型之间有相同属性且属性类型不同则属性类型为never, 其他直接合并
 * 3. 函数类型, 多个交叉函数之间会得到一个函数重载
 */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

/** 将emits定义转为emit函数类型 */
export type Emitter<
  Emits = EmitsObject,
  EvName extends keyof Emits = keyof Emits
> = Emits extends Array<infer EvName>
  ? (evName: EvName, ...args: any[]) => void
  : UnionToIntersection<
      {
        [key in EvName]: Emits[key] extends (...args: infer Args) => any
          ? (evName: key, ...args: Args) => void
          : (evName: key, ...args: any[]) => void
      }[EvName]
    >
