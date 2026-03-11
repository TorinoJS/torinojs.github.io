import { createFileRoute } from '@tanstack/react-router'
import { EventsPage } from '~/pages/EventsPage'
import { getTranslations } from '~/i18n'

const t = getTranslations('it')

export const Route = createFileRoute('/events')({
  component: EventsPage,
  head: () => ({
    meta: [
      {
        title: t.meta.eventsTitle,
      },
      {
        name: 'description',
        content: t.meta.eventsDescription,
      },
    ],
  }),
})
