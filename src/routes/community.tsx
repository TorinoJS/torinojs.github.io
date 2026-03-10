import { createFileRoute } from '@tanstack/react-router'
import { CommunityPage } from '~/pages/CommunityPage'

export const Route = createFileRoute('/community')({
  component: CommunityPage,
  head: () => ({
    meta: [
      {
        title: 'Community - TorinoJS',
      },
      {
        name: 'description',
        content: 'Unisciti alla community di TorinoJS. Connettiti con sviluppatori JavaScript a Torino.',
      },
    ],
  }),
})
