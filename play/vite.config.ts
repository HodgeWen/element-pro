import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import glob from 'fast-glob'
import { epRoot, pkgRoot, projRoot } from '../build/utils/paths'
import './vite.init'

export default defineConfig(async () => {
  const optimizeDeps = (
    await glob(['lodash/*.js', 'dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
    })
  ).map((dep) => dep.replace(/\.js$/, ''))
  return {
    resolve: {
      alias: [
        {
          find: /^element-pro(\/(es|lib))?$/,
          replacement: path.resolve(epRoot, 'index.ts'),
        },
        {
          find: /^element-pro\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
      ],
    },
    server: {
      host: true,
    },
    plugins: [vue(), vueJsx(), Inspect()],

    optimizeDeps: {
      include: [
        '@vue/shared',
        '@vueuse/core',
        'memoize-one',
        'normalize-wheel-es',
        '@popperjs/core',
        'dayjs',
        '@element-plus/icons',
        ...optimizeDeps,
      ],
    },
  }
})
