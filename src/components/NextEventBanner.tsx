import { useLocale } from '~/i18n/context'
import {
  useMeetupEvents,
  formatEventDate,
  formatEventTimeRange,
  isToday,
  isTomorrow,
} from '~/hooks/useMeetupEvents'
import { Reveal } from 'react-kino'
import { CalendarCheck, MapPin, Clock } from 'lucide-react'
import { ArrowSquareOut } from '@phosphor-icons/react'

export function NextEventBanner() {
  const { locale, t } = useLocale()
  const { nextEvent, loading } = useMeetupEvents()

  // Don't render anything while loading or if there's no upcoming event
  if (loading || !nextEvent) return null

  const dateStr = formatEventDate(nextEvent.start, locale)
  const timeRange = formatEventTimeRange(nextEvent.start, nextEvent.end, locale)
  const today = isToday(nextEvent.start)
  const tomorrow = isTomorrow(nextEvent.start)

  return (
    <Reveal at={0} animation="fade-up" duration={600}>
      <div className={`next-event-banner ${today ? 'next-event-banner--today' : ''}`}>
        <div className="next-event-banner-inner">
          <div className="next-event-label">
            <CalendarCheck size={18} />
            <span>{t.home.nextEvent}</span>
            {today && <span className="next-event-badge">{t.home.happeningToday}</span>}
            {tomorrow && <span className="next-event-badge next-event-badge--tomorrow">{t.home.happeningTomorrow}</span>}
          </div>

          <h3 className="next-event-title">{nextEvent.title}</h3>

          {nextEvent.description && (
            <p className="next-event-description">{nextEvent.description}</p>
          )}

          <div className="next-event-meta">
            <span>
              <CalendarCheck size={14} />
              {dateStr}
            </span>
            <span>
              <Clock size={14} />
              {timeRange}
            </span>
            {nextEvent.location && (
              <span>
                <MapPin size={14} />
                {nextEvent.location}
              </span>
            )}
          </div>

          <div className="next-event-actions">
            <a
              href={nextEvent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ArrowSquareOut size={18} weight="bold" />
              {t.home.rsvpOnMeetup}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
