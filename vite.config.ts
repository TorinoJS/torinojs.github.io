import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        concurrency: 4,
        crawlLinks: true,
        retryCount: 2,
        retryDelay: 1000,
        maxRedirects: 5,
        failOnError: true,
        routes: [
          // Italian (default) routes
          '/',
          '/events',
          '/about',
          '/community',
          // English routes
          '/en',
          '/en/events',
          '/en/about',
          '/en/community',
        ],
        onSuccess: ({ page }) => {
          console.log(`Prerendered: ${page.path}`)
        },
      },
    }),
    viteReact(),
  ],
})
