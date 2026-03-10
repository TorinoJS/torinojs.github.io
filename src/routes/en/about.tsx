import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '~/pages/AboutPage'

export const Route = createFileRoute('/en/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: 'About - TorinoJS',
      },
      {
        name: 'description',
        content: 'Learn about TorinoJS, the JavaScript community in Torino, Italy.',
      },
    ],
  }),
})
