import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/HomePage'
import { getTranslations } from '~/i18n'

const t = getTranslations('it')

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: t.meta.siteTitle,
      },
    ],
  }),
})
