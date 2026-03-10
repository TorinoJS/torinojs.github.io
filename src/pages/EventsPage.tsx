import { useLocale } from '~/i18n/context'
import { Kino, Scene, Reveal } from 'react-kino'
import { MapPin, Clock, Tag } from 'lucide-react'
import { Microphone } from '@phosphor-icons/react'

export function EventsPage() {
  const { locale, t } = useLocale()

  const upcomingEvents = [
    {
      id: 1,
      title: t.events.event1Title,
      description: t.events.event1Desc,
      date: '2026-04-15',
      month: 'APR',
      day: '15',
      location: 'Toolbox Coworking, Torino',
      time: '19:00 - 22:00',
      type: t.events.meetup,
    },
    {
      id: 2,
      title: t.events.event2Title,
      description: t.events.event2Desc,
      date: '2026-05-10',
      month: 'MAY',
      day: '10',
      location: 'OGR Torino',
      time: '14:00 - 18:00',
      type: t.events.workshop,
    },
    {
      id: 3,
      title: t.events.event3Title,
      description: t.events.event3Desc,
      date: '2026-06-17',
      month: 'JUN',
      day: '17',
      location: 'Toolbox Coworking, Torino',
      time: '19:00 - 22:00',
      type: t.events.meetup,
    },
  ]

  const pastEvents = [
    {
      id: 101,
      title: t.events.event4Title,
      description: t.events.event4Desc,
      date: '2026-02-18',
      month: 'FEB',
      day: '18',
      location: 'Toolbox Coworking, Torino',
      time: '19:00 - 22:00',
      type: t.events.meetup,
    },
    {
      id: 102,
      title: t.events.event5Title,
      description: t.events.event5Desc,
      date: '2026-01-22',
      month: 'JAN',
      day: '22',
      location: 'OGR Torino',
      time: '14:00 - 18:00',
      type: t.events.workshop,
    },
  ]

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

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <h2>{t.events.upcoming}</h2>
          </div>

          {upcomingEvents.map((event, i) => (
            <Reveal key={event.id} at={0} animation="fade-up" duration={500} delay={i * 120}>
              <div className="event-card">
                <div className="event-date">
                  <div className="month">{event.month}</div>
                  <div className="day">{event.day}</div>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><MapPin size={14} /> {event.location}</span>
                    <span><Clock size={14} /> {event.time}</span>
                    <span><Tag size={14} /> {event.type}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-inner">
          <div className="section-header">
            <h2>{t.events.past}</h2>
          </div>

          {pastEvents.map((event, i) => (
            <Reveal key={event.id} at={0} animation="fade-up" duration={500} delay={i * 120}>
              <div className="event-card">
                <div className="event-date">
                  <div className="month">{event.month}</div>
                  <div className="day">{event.day}</div>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="event-meta">
                    <span><MapPin size={14} /> {event.location}</span>
                    <span><Clock size={14} /> {event.time}</span>
                    <span><Tag size={14} /> {event.type}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.events.wantToSpeak}</h2>
          <p>{t.events.wantToSpeakDesc}</p>
          <a
            href="https://github.com/AuralJS/discussion/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <Microphone size={18} weight="bold" />
            {t.events.proposeTalk}
          </a>
        </Reveal>
      </section>
    </Kino>
  )
}
