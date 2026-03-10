import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/HomePage'

export const Route = createFileRoute('/en/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: 'TorinoJS - JavaScript Community in Torino',
      },
    ],
  }),
})
