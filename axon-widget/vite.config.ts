import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function demoHtmlPlugin(): Plugin {
  return {
    name: 'axon-demo-html',
    closeBundle() {
      const html = readFileSync(resolve(__dirname, 'index.html'), 'utf8')
      const production = html.replace(
        /<script\s+type="module"\s+src="\/src\/main\.tsx"([\s\S]*?)><\/script>/,
        '<script src="./widget.js"$1></script>',
      )
      writeFileSync(resolve(__dirname, 'dist/index.html'), production)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' ? [demoHtmlPlugin()] : [])],
  ...(command === 'build'
    ? {
        build: {
          lib: {
            entry: resolve(__dirname, 'src/main.tsx'),
            name: 'AxonWidget',
            formats: ['iife'],
            fileName: () => 'widget.js',
          },
          rollupOptions: {
            output: {
              inlineDynamicImports: true,
            },
          },
          cssCodeSplit: false,
          emptyOutDir: true,
        },
      }
    : {}),
}))
