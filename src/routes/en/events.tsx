import { createFileRoute } from '@tanstack/react-router'
import { EventsPage } from '~/pages/EventsPage'
import { getTranslations } from '~/i18n'

const t = getTranslations('en')

export const Route = createFileRoute('/en/events')({
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
