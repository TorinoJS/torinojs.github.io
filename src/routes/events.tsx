import { createFileRoute } from '@tanstack/react-router'
import { EventsPage } from '~/pages/EventsPage'

export const Route = createFileRoute('/events')({
  component: EventsPage,
  head: () => ({
    meta: [
      {
        title: 'Eventi - TorinoJS',
      },
      {
        name: 'description',
        content: 'Prossimi eventi e eventi passati di TorinoJS: meetup e workshop a Torino.',
      },
    ],
  }),
})
