import { createFileRoute } from '@tanstack/react-router'
import { CommunityPage } from '~/pages/CommunityPage'
import { getTranslations } from '~/i18n'

const t = getTranslations('it')

export const Route = createFileRoute('/community')({
  component: CommunityPage,
  head: () => ({
    meta: [
      {
        title: t.meta.communityTitle,
      },
      {
        name: 'description',
        content: t.meta.communityDescription,
      },
    ],
  }),
})
