import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core'
      ],
      dirs: [
        './src/composables'
      ],
      vueTemplate: true
    }),
    UnoCSS({
      shortcuts: {
        'border-base': 'border-gray/20 dark:border-gray/15',
        'bg-base': 'bg-white dark:bg-truegray-800',
        'bg-canvas': 'bg-gray:15 dark:bg-truegray-700',
        'icon-btn': 'op40 hover:op100'
      },
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()
      ]
    })
  ],
})
