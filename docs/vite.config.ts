import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
import { projRoot } from './.vitepress/utils/paths'
import type { Alias } from 'vite'

const alias: Alias[] = []
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^element-pro(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/element-pro/index.ts'),
    },
    {
      find: /^element-pro\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig({
  server: {
    host: true,
    fs: {
      strict: true,
      allow: [projRoot],
    },
  },
  resolve: {
    alias,
  },
  plugins: [Inspect()],
  optimizeDeps: {
    include: [
      'vue',
      'markdown-it',
      'clipboard-copy',
      '@vueuse/core',
      'axios',
      'nprogress',
      '@element-plus/icons',
      'dayjs',
      'memoize-one',
      'async-validator',
      'lodash',
      '@popperjs/core',
      'normalize-wheel-es',
    ],
  },
})