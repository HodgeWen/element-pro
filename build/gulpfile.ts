import path from 'path'
import { series, parallel } from 'gulp'
import { run } from './utils/process'
import { withTaskName } from './utils/gulp'
import { buildOutput, epOutput, epPackage, projRoot } from './utils/paths'
import { buildConfig } from './build-info'
import type { TaskFunction } from 'gulp'
import type { Module } from './build-info'

import { generateTypesDefinitions } from './types-definitions'
import { buildModules } from './modules'
import { buildFullBundle } from './full-bundle'
import { buildHelper } from './helper'


// 文件拷贝
const copyFiles = () => {
  const copyTypings = async () => {
    const src = path.resolve(projRoot, 'typings', 'global.d.ts')
    await run(`cp ${src} ${epOutput}`)
  }

  return Promise.all([
    run(`cp ${epPackage} ${path.join(epOutput, 'package.json')}`),
    run(`cp README.md ${epOutput}`),
    copyTypings()
  ])
}

// 拷贝类型定义文件
const copyTypesDefinitions: TaskFunction = done => {
  const src = `${buildOutput}/types/`
  const copy = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      run(`rsync -a ${src} ${buildConfig[module].output.path}/`)
    )

  return parallel(copy('esm'), copy('cjs'))(done)
}

// 拷贝所有的样式
const copyFullStyle = async () => {
  await run(`mkdir -p ${epOutput}/dist`)
  await run(`cp ${epOutput}/theme-chalk/index.css ${epOutput}/dist/index.css`)
}

const clean = () => run('pnpm run clean')

const buildThemeChalk = () => {
  return run('pnpm run -C packages/theme-chalk build')
}

export default series(
  // 清除
  clean,

  // 构建
  parallel(
    buildModules, // 构建模块
    // buildFullBundle, // 构建完整包
    generateTypesDefinitions, // 生成类型文件
    buildHelper, // 生成帮助文件
    series(buildThemeChalk, copyFullStyle) // 构建样式
  ),

  // 拷贝
  parallel(copyTypesDefinitions, copyFiles)
)
