import { useState } from 'react'
import { Reveal } from 'react-kino'
import { MessageCircle, Clock, ExternalLink } from 'lucide-react'
import { ThumbsUp, ArrowsDownUp } from '@phosphor-icons/react'
import { useLocale } from '~/i18n/context'
import {
  type GitHubIssue,
  type SortMode,
  getUpvoteScore,
  sortIssues,
  formatRelativeTime,
  truncateBody,
} from '~/hooks/useGitHubIssues'

function IssueCard({ issue, index }: { issue: GitHubIssue; index: number }) {
  const { locale, t } = useLocale()
  const score = getUpvoteScore(issue)
  const isClosed = issue.state === 'closed'

  return (
    <Reveal at={0} animation="fade-up" duration={400} delay={index * 80}>
      <div className={`issue-card ${isClosed ? 'issue-card--closed' : ''}`}>
        <div className="issue-card-vote">
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="issue-vote-btn"
            title={t.community.voteOnGitHub}
          >
            <ThumbsUp size={20} weight={score > 0 ? 'fill' : 'regular'} />
            <span className="issue-vote-count">{score}</span>
          </a>
        </div>

        <div className="issue-card-content">
          <div className="issue-card-header">
            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="issue-card-title"
            >
              {issue.title}
            </a>
            <span className={`issue-state-badge issue-state-badge--${issue.state}`}>
              {isClosed ? t.community.closedIssue : t.community.openIssue}
            </span>
          </div>

          {issue.body && (
            <p className="issue-card-body">{truncateBody(issue.body, 180)}</p>
          )}

          <div className="issue-card-meta">
            <span className="issue-meta-item issue-meta-author">
              <img
                src={issue.author.avatarUrl}
                alt={issue.author.login}
                className="issue-author-avatar"
                width="18"
                height="18"
                loading="lazy"
              />
              {issue.author.login}
            </span>

            <span className="issue-meta-item">
              <Clock size={14} />
              {formatRelativeTime(issue.createdAt, locale)}
            </span>

            {issue.comments > 0 && (
              <span className="issue-meta-item">
                <MessageCircle size={14} />
                {issue.comments} {issue.comments === 1 ? t.community.comment : t.community.comments}
              </span>
            )}

            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="issue-meta-item issue-meta-link"
            >
              <ExternalLink size={14} />
              #{issue.id}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

interface DiscussionSectionProps {
  title: string
  description: string
  issues: GitHubIssue[]
  defaultSort: SortMode
  allowVoteSort: boolean
  newIssueUrl: string
}

export function DiscussionSection({
  title,
  description,
  issues,
  defaultSort,
  allowVoteSort,
  newIssueUrl,
}: DiscussionSectionProps) {
  const { t } = useLocale()
  const [sortMode, setSortMode] = useState<SortMode>(defaultSort)

  const sorted = sortIssues(issues, sortMode)

  const sortOptions: { value: SortMode; label: string }[] = [
    ...(allowVoteSort ? [{ value: 'votes' as SortMode, label: t.community.sortByVotes }] : []),
    { value: 'newest', label: t.community.sortByNewest },
    { value: 'oldest', label: t.community.sortByOldest },
    { value: 'recent-activity', label: t.community.sortByActivity },
  ]

  return (
    <div className="discussion-section">
      <div className="discussion-section-header">
        <div className="discussion-section-info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="discussion-section-controls">
          <div className="sort-control">
            <ArrowsDownUp size={16} weight="bold" />
            <label className="sort-label">{t.community.sortLabel}:</label>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="sort-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <a
            href={newIssueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-small btn-secondary"
          >
            {t.community.openNewIssue}
          </a>
        </div>
      </div>

      {sorted.length === 0 ? (
        <Reveal at={0} animation="fade-up" duration={400}>
          <div className="discussion-empty">
            <p>{t.community.noIssuesInSection}</p>
            <a
              href={newIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t.community.openNewIssue}
            </a>
          </div>
        </Reveal>
      ) : (
        <div className="issue-list">
          {sorted.map((issue, i) => (
            <IssueCard key={issue.id} issue={issue} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
