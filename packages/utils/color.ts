/**
 * 将十六进制颜色转化为RGB格式的对象
 * @param color 十六进制颜色字符串
 */
export function calcColorChannels(color: string) {
  color = color.trim() // 解决vue-use useCssVar的bug
  if (![3, 4, 7].includes(color.length)) {
    throw Error('颜色格式有误')
  }
  let rawColor = color.replace('#', '')
  if (/^[0-9a-fA-F]{3}$/.test(rawColor)) {
    rawColor = rawColor.split('').map(s => s + s).join('')
  }
  if (/^[0-9a-fA-F]{6}$/.test(rawColor)) {
    return {
      red: parseInt(rawColor.slice(0, 2), 16),
      green: parseInt(rawColor.slice(2, 4), 16),
      blue: parseInt(rawColor.slice(4, 6), 16),
    }
  }
  return {
    red: 255,
    green: 255,
    blue: 255,
  }
}

/**
 * 混合颜色 - mixColor('#fff', 1) -> rgb(0, 0, 0)
 * @param color 十六进制颜色
 * @param percent 百分比, 范围 -1 ~ 1, > 0 颜色更暗 反之越亮
 */
export function mixColor(color: string, percent = 0.2) {
  let { red, green, blue } = calcColorChannels(color)
  if (percent > 0) {
    let p = 1 - percent
    red *= p, green *= p, blue *= p
  } else {
    const p = Math.abs(percent)
    red += (255 - red) * p
    green += (255 - green) * p
    blue += (255 - blue) * p
  }
  return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`
}

export function lighten(color: string, percent = 0.2) {
  return mixColor(color, -percent)
}

export function darken(color: string, percent = 0.2) {
  return mixColor(color, percent)
}
