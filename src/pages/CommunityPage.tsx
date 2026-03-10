import { useState, useEffect, useCallback } from 'react'
import { useLocale } from '~/i18n/context'
import { Kino, Reveal } from 'react-kino'
import { Calendar } from 'lucide-react'
import {
  GithubLogo,
  Microphone,
  Megaphone,
  Wrench,
  HandHeart,
  CurrencyCircleDollar,
  Student,
  ShareNetwork,
  ChatCircleDots,
  Lightbulb,
  Question,
  HandsClapping,
  GearSix,
  TelegramLogo,
  CalendarBlank,
  LinkSimple,
} from '@phosphor-icons/react'
import { DiscussionSection } from '~/components/DiscussionSection'
import {
  useGitHubIssues,
  SECTION_CONFIGS,
} from '~/hooks/useGitHubIssues'
import { getConnectContacts, getProposeTalkUrl, type Contact } from '~/config/contacts'
import type { Translations } from '~/i18n'

/**
 * Map a contact type to its Phosphor icon component (size 40, duotone).
 */
function ContactIcon({ type, size = 40 }: { type: Contact['type']; size?: number }) {
  switch (type) {
    case 'github':
      return <GithubLogo size={size} weight="duotone" />
    case 'telegram':
      return <TelegramLogo size={size} weight="duotone" />
    case 'meetup':
      return <CalendarBlank size={size} weight="duotone" />
    case 'microphone':
      return <Microphone size={size} weight="duotone" />
    default:
      return <LinkSimple size={size} weight="duotone" />
  }
}

/**
 * Get the i18n title and description for a contact by its id.
 * Falls back to the contact id if no i18n key exists.
 */
function getContactI18n(
  id: string,
  t: Translations
): { title: string; description: string } {
  const community = t.community as Record<string, unknown>
  const title = (community[id] as string) ?? id
  const description = (community[`${id}Desc`] as string) ?? ''
  return { title, description }
}

export type CommunityTab = 'connect' | 'involved' | 'discussions'

export const VALID_TABS: CommunityTab[] = ['connect', 'involved', 'discussions']

function getTabFromHash(): CommunityTab {
  if (typeof window === 'undefined') return 'connect'
  const hash = window.location.hash.replace('#', '')
  return VALID_TABS.includes(hash as CommunityTab) ? (hash as CommunityTab) : 'connect'
}

/**
 * Map label names to i18n section title/description keys.
 */
function useSectionI18n() {
  const { t } = useLocale()

  const map: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
    'topic request': {
      title: t.community.sectionTopicRequest,
      description: t.community.sectionTopicRequestDesc,
      icon: <Lightbulb size={22} weight="duotone" />,
    },
    'workshop proposal': {
      title: t.community.sectionWorkshopProposal,
      description: t.community.sectionWorkshopProposalDesc,
      icon: <Wrench size={22} weight="duotone" />,
    },
    'ops enhancement': {
      title: t.community.sectionOpsEnhancement,
      description: t.community.sectionOpsEnhancementDesc,
      icon: <GearSix size={22} weight="duotone" />,
    },
    'help wanted': {
      title: t.community.sectionHelpWanted,
      description: t.community.sectionHelpWantedDesc,
      icon: <HandsClapping size={22} weight="duotone" />,
    },
    'question': {
      title: t.community.sectionQuestion,
      description: t.community.sectionQuestionDesc,
      icon: <Question size={22} weight="duotone" />,
    },
  }

  return map
}

export function CommunityPage() {
  const { t } = useLocale()
  const [activeTab, setActiveTabState] = useState<CommunityTab>(getTabFromHash)
  const { issues, loading, repoUrl, getIssuesByLabel } = useGitHubIssues()
  const sectionI18n = useSectionI18n()

  const setActiveTab = useCallback((tab: CommunityTab) => {
    setActiveTabState(tab)
    window.history.replaceState(null, '', `#${tab}`)
  }, [])

  useEffect(() => {
    const onHashChange = () => setActiveTabState(getTabFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const tabs: { id: CommunityTab; label: string }[] = [
    { id: 'connect', label: t.community.tabConnect },
    { id: 'involved', label: t.community.tabGetInvolved },
    { id: 'discussions', label: t.community.tabDiscussions },
  ]

  return (
    <Kino>
      {/* Tab Navigation */}
      <div className="community-tabs">
        <div className="community-tabs-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`community-tab ${activeTab === tab.id ? 'community-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="community-tab-content">
        {/* Connect Tab */}
        {activeTab === 'connect' && (
          <section className="section">
            <div className="section-inner">
              <div className="section-header">
                <Reveal at={0} animation="fade-up" duration={600}>
                  <h2>{t.community.howToConnect}</h2>
                  <p>{t.community.howToConnectSub}</p>
                </Reveal>
              </div>

              <div className="cards-grid">
                {getConnectContacts().map((contact, index) => {
                  const { title, description } = getContactI18n(contact.id, t)
                  return (
                    <Reveal key={contact.id} at={0} animation="fade-up" duration={500} delay={index * 150}>
                      <a
                        href={contact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card"
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="card-icon">
                          <ContactIcon type={contact.type} />
                        </div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                      </a>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Get Involved Tab */}
        {activeTab === 'involved' && (
          <section className="section">
            <div className="section-inner">
              <div className="section-header">
                <Reveal at={0} animation="fade-up" duration={600}>
                  <h2>{t.community.getInvolved}</h2>
                  <p>{t.community.getInvolvedSub}</p>
                </Reveal>
              </div>

              <div className="cards-grid">
                <Reveal at={0} animation="fade-up" duration={500} delay={0}>
                  <div className="card">
                    <div className="card-icon">
                      <Megaphone size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.speakTitle}</h3>
                    <p>{t.community.speakDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0} animation="fade-up" duration={500} delay={100}>
                  <div className="card">
                    <div className="card-icon">
                      <Wrench size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.hostWorkshop}</h3>
                    <p>{t.community.hostWorkshopDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0} animation="fade-up" duration={500} delay={200}>
                  <div className="card">
                    <div className="card-icon">
                      <HandHeart size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.volunteer}</h3>
                    <p>{t.community.volunteerDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0} animation="fade-up" duration={500} delay={300}>
                  <div className="card">
                    <div className="card-icon">
                      <CurrencyCircleDollar size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.sponsor}</h3>
                    <p>{t.community.sponsorDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0} animation="fade-up" duration={500} delay={400}>
                  <div className="card">
                    <div className="card-icon">
                      <Student size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.mentor}</h3>
                    <p>{t.community.mentorDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0} animation="fade-up" duration={500} delay={500}>
                  <div className="card">
                    <div className="card-icon">
                      <ShareNetwork size={36} weight="duotone" />
                    </div>
                    <h3>{t.community.spreadWord}</h3>
                    <p>{t.community.spreadWordDesc}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <section className="section">
            <div className="section-inner">
              <div className="section-header">
                <Reveal at={0} animation="fade-up" duration={600}>
                  <ChatCircleDots size={32} weight="duotone" className="section-header-icon" />
                  <h2>{t.community.discussionsTitle}</h2>
                  <p>{t.community.discussionsSub}</p>
                </Reveal>
              </div>

              {loading ? (
                <Reveal at={0} animation="fade-up" duration={400}>
                  <div className="discussions-loading">
                    <GithubLogo size={32} weight="duotone" />
                    <p>{t.community.loadingDiscussions}</p>
                  </div>
                </Reveal>
              ) : (
                <>
                  {SECTION_CONFIGS.map((config) => {
                    const sectionIssues = getIssuesByLabel(config.labelName)
                    const info = sectionI18n[config.labelName]
                    if (!info) return null

                    // Build new issue URL with the label pre-selected
                    const labelParam = encodeURIComponent(config.labelName)
                    const newIssueUrl = `${repoUrl}/issues/new?labels=${labelParam}`

                    return (
                      <DiscussionSection
                        key={config.labelName}
                        title={info.title}
                        description={info.description}
                        issues={sectionIssues}
                        defaultSort={config.defaultSort}
                        allowVoteSort={config.allowVoteSort}
                        newIssueUrl={newIssueUrl}
                      />
                    )
                  })}

                  <p className="discussions-attribution">
                    <GithubLogo size={16} weight="bold" /> {t.community.poweredByGitHub}
                  </p>
                </>
              )}
            </div>
          </section>
        )}
      </div>

      {/* CTA - always visible */}
      <section className="cta-section">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.community.joinNextEvent}</h2>
          <p>{t.community.joinNextEventDesc}</p>
          <a
            href={getProposeTalkUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Calendar size={18} />
            {t.community.viewUpcoming}
          </a>
        </Reveal>
      </section>
    </Kino>
  )
}
