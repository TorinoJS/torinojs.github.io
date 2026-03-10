import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '~/pages/AboutPage'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: 'Chi Siamo - TorinoJS',
      },
      {
        name: 'description',
        content: 'Scopri TorinoJS, la community JavaScript di Torino, Italia.',
      },
    ],
  }),
})
