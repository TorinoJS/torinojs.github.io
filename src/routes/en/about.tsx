import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '~/pages/AboutPage'
import { getTranslations } from '~/i18n'

const t = getTranslations('en')

export const Route = createFileRoute('/en/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: t.meta.aboutTitle,
      },
      {
        name: 'description',
        content: t.meta.aboutDescription,
      },
    ],
  }),
})
