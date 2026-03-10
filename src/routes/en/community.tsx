import { createFileRoute } from '@tanstack/react-router'
import { CommunityPage } from '~/pages/CommunityPage'

export const Route = createFileRoute('/en/community')({
  component: CommunityPage,
  head: () => ({
    meta: [
      {
        title: 'Community - TorinoJS',
      },
      {
        name: 'description',
        content: 'Join the TorinoJS community. Connect with JavaScript developers in Torino.',
      },
    ],
  }),
})
