import type { TaskFunction } from 'gulp'

export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => {
  return Object.assign(fn, { displayName: name })
}
