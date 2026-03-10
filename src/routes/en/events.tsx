import { createFileRoute } from '@tanstack/react-router'
import { EventsPage } from '~/pages/EventsPage'

export const Route = createFileRoute('/en/events')({
  component: EventsPage,
  head: () => ({
    meta: [
      {
        title: 'Events - TorinoJS',
      },
      {
        name: 'description',
        content: 'Upcoming and past TorinoJS events, meetups, and workshops in Torino.',
      },
    ],
  }),
})
