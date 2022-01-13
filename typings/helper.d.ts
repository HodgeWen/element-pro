declare type ValueOf<T> = T[keyof T]

declare type UnionsTypeOmit<T extends string, K extends T> = ValueOf<{
  [Key in T]: Key extends K ? never : Key
}>