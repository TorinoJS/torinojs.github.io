import { useLocale } from '~/i18n/context'
import { Kino, Scene, Reveal } from 'react-kino'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { Microphone, CalendarCheck } from '@phosphor-icons/react'
import { getProposeTalkUrl } from '~/config/contacts'
import {
  useMeetupEvents,
  formatEventDate,
  formatEventTimeRange,
  extractDateParts,
  type MeetupEvent,
} from '~/hooks/useMeetupEvents'

function EventCard({
  event,
  locale,
  index,
}: {
  event: MeetupEvent
  locale: 'it' | 'en'
  index: number
}) {
  const { month, day } = extractDateParts(event.start, locale)
  const timeRange = formatEventTimeRange(event.start, event.end, locale)

  return (
    <Reveal at={0} animation="fade-up" duration={500} delay={index * 120}>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="event-card event-card--link"
      >
        <div className="event-date">
          <div className="month">{month}</div>
          <div className="day">{day}</div>
        </div>
        <div className="event-info">
          <h3>{event.title}</h3>
          {event.description && <p>{event.description}</p>}
          <div className="event-meta">
            <span>
              <Clock size={14} /> {timeRange}
            </span>
            {event.location && (
              <span>
                <MapPin size={14} /> {event.location}
              </span>
            )}
            <span className="event-meetup-link">
              <ExternalLink size={14} /> Meetup
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export function EventsPage() {
  const { locale, t } = useLocale()
  const { upcoming, past, loading, groupUrl } = useMeetupEvents()

  return (
    <Kino>
      <Scene duration="80vh" pin={true}>
        {(progress: number) => (
          <div className="page-header">
            <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
              <h1>{t.events.title}</h1>
              <p>{t.events.subtitle}</p>
            </Reveal>
          </div>
        )}
      </Scene>

      {/* Upcoming Events */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2>{t.events.upcoming}</h2>
          </div>

          {loading && (
            <Reveal at={0} animation="fade-up" duration={400}>
              <div className="events-loading">
                <CalendarCheck size={32} weight="duotone" />
                <p>{t.events.loadingEvents}</p>
              </div>
            </Reveal>
          )}

          {!loading && upcoming.length === 0 && (
            <Reveal at={0} animation="fade-up" duration={500}>
              <div className="events-empty">
                <CalendarCheck size={48} weight="duotone" />
                <h3>{t.events.noUpcomingEvents}</h3>
                <p>{t.events.noUpcomingEventsDesc}</p>
                <a
                  href={groupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <CalendarCheck size={18} weight="bold" />
                  {t.events.followOnMeetup}
                </a>
              </div>
            </Reveal>
          )}

          {!loading &&
            upcoming.map((event, i) => (
              <EventCard key={event.id} event={event} locale={locale} index={i} />
            ))}
        </div>
      </section>

      {/* Past Events */}
      {!loading && past.length > 0 && (
        <section className="section section--alt">
          <div className="section-inner">
            <div className="section-header">
              <h2>{t.events.past}</h2>
            </div>

            {past.map((event, i) => (
              <EventCard key={event.id} event={event} locale={locale} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Powered by Meetup + CTA */}
      <section className="cta-section">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.events.wantToSpeak}</h2>
          <p>{t.events.wantToSpeakDesc}</p>
          <div className="hero-actions">
            <a
              href={getProposeTalkUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <Microphone size={18} weight="bold" />
              {t.events.proposeTalk}
            </a>
            <a
              href={groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <CalendarCheck size={18} weight="bold" />
              {t.events.followOnMeetup}
            </a>
          </div>
          <p className="events-attribution">{t.events.poweredByMeetup}</p>
        </Reveal>
      </section>
    </Kino>
  )
}
