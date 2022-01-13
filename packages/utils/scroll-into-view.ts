import isServer from './isServer'

/**
 * 使目标元素滚动至容器的可视区域
 * @param container 容器
 * @param selected 目标元素
 * @returns
 */
export default function scrollIntoView(
  container: HTMLElement,
  selected: HTMLElement
) {
  if (isServer) return
  const offsetParents: HTMLElement[] = []

  let pointer = selected.offsetParent as HTMLElement
  while (
    pointer !== null &&
    container !== pointer &&
    container.contains(pointer)
  ) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent as HTMLElement
  }
  const top =
    selected.offsetTop +
    offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}
