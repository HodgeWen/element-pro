import { EVENT_CODE, triggerEvent } from '../aria'
import type MenuItem from './menu-item'

class SubMenu {
  public subMenuItems!: NodeList
  public subIndex = 0

  constructor(public parent: MenuItem, public domNode: ParentNode) {
    this.subIndex = 0
    this.init()
  }

  init(): void {
    this.subMenuItems = this.domNode.querySelectorAll('li')
    this.addListeners()
  }

  gotoSubIndex(idx: number): void {
    if (idx === this.subMenuItems.length) {
      idx = 0
    } else if (idx < 0) {
      idx = this.subMenuItems.length - 1
    }
    ;(this.subMenuItems[idx] as HTMLElement).focus()
    this.subIndex = idx
  }

  addListeners(): void {
    const parentNode = this.parent.domNode

    const strategies = {
      [EVENT_CODE.down]: (e: KeyboardEvent) => {
        this.gotoSubIndex(this.subIndex + 1)
        return true
      },
      [EVENT_CODE.up]: (e: KeyboardEvent) => {
        this.gotoSubIndex(this.subIndex - 1)
        return true
      },
      [EVENT_CODE.tab]: (e: KeyboardEvent) => {
        triggerEvent(parentNode, 'mouseleave')
        return false
      },
      [EVENT_CODE.enter]: (e: KeyboardEvent) => {
        e.currentTarget?.dispatchEvent(new Event('click'))
        return true
      },
      [EVENT_CODE.space]: (e: KeyboardEvent) => {
        e.currentTarget?.dispatchEvent(new Event('click'))
        return true
      },
    }
    Array.prototype.forEach.call(this.subMenuItems, (el: HTMLLIElement) => {
      el.addEventListener('keydown', (event: KeyboardEvent) => {
        const prevDef = strategies[event.code](event)

        if (prevDef) {
          event.preventDefault()
          event.stopPropagation()
        }
        return false
      })
    })
  }
}

export default SubMenu
