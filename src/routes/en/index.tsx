import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/HomePage'
import { getTranslations } from '~/i18n'

const t = getTranslations('en')

export const Route = createFileRoute('/en/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: t.meta.siteTitle,
      },
    ],
  }),
})
