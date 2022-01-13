export const cubic = (value: number) => Math.pow(value, 3)

/**
 * 三次方缓动公式
 * @param value
 */
export const easeInOutCubic = (value: number) =>
  value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2
