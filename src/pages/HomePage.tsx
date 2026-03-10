import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/context'
import { localePath } from '~/i18n'
import { Kino, Scene, Reveal, Counter, Marquee } from 'react-kino'
import { Calendar, ArrowRight } from 'lucide-react'
import {
  Microphone,
  Code,
  Wrench,
  Handshake,
  CalendarCheck,
  UsersThree,
  ChatTeardropDots,
  Lightning,
} from '@phosphor-icons/react'

export function HomePage() {
  const { locale, t } = useLocale()

  return (
    <Kino>
      {/* Hero */}
      <Scene duration="150vh" pin={true}>
        {(progress: number) => (
          <section className="hero">
            <div className="hero-content">
              <Reveal at={0} animation="scale" duration={800}>
                <img
                  src="/torinojs-logo.svg"
                  alt="TorinoJS Logo"
                  className="hero-logo"
                  width="120"
                  height="120"
                />
              </Reveal>
              <Reveal at={0.05} animation="fade-up" duration={600}>
                <h1>TorinoJS</h1>
              </Reveal>
              <Reveal at={0.1} animation="fade-up" duration={600} delay={100}>
                <p className="tagline">{t.home.tagline}</p>
              </Reveal>
              <Reveal at={0.15} animation="fade-up" duration={600} delay={200}>
                <div className="hero-actions">
                  <Link to={localePath('/events', locale)} className="btn btn-primary">
                    <Calendar size={18} />
                    {t.home.upcomingEvents}
                  </Link>
                  <a
                    href="https://github.com/AuralJS/discussion/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <Microphone size={18} weight="bold" />
                    {t.home.proposeTalk}
                  </a>
                </div>
              </Reveal>

              <Reveal at={0.2} animation="fade-up" duration={800} delay={300}>
                <div className="code-block">
                  <span className="keyword">const</span>{' '}
                  <span className="variable">torinoJS</span>{' '}
                  <span className="operator">=</span> {'{\n'}
                  {'  '}
                  <span className="function">people</span>
                  {'('}
                  <span className="string">"#jsNight"</span>
                  {')'}
                  {'\n'}
                  {'    .'}
                  <span className="function">do</span>
                  {'('}
                  <span className="string">code</span>{' '}
                  <span className="operator">&&</span>{' '}
                  <span className="string">blabla</span>
                  {')'}
                  {'\n'}
                  {'    .'}
                  <span className="function">then</span>
                  {'('}
                  <span className="string">pizza</span>{' '}
                  <span className="operator">&&</span>{' '}
                  <span className="string">beer</span>
                  {')'}
                  {'\n'}
                  {'};'}
                  {'\n'}
                  <span className="comment">{t.home.codeComment}</span>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </Scene>

      {/* Tech Marquee */}
      <div className="marquee-section">
        <Marquee speed={35} pauseOnHover={true} gap={48}>
          <span className="marquee-item">JavaScript</span>
          <span className="marquee-item">TypeScript</span>
          <span className="marquee-item">React</span>
          <span className="marquee-item">Node.js</span>
          <span className="marquee-item">Vue</span>
          <span className="marquee-item">Deno</span>
          <span className="marquee-item">Bun</span>
          <span className="marquee-item">Next.js</span>
          <span className="marquee-item">TanStack</span>
          <span className="marquee-item">GraphQL</span>
          <span className="marquee-item">IoT</span>
          <span className="marquee-item">Open Source</span>
        </Marquee>
      </div>

      {/* What We Do */}
      <Scene duration="200vh" pin={true}>
        {(progress: number) => (
          <section className="section section--alt">
            <div className="section-inner">
              <div className="section-header">
                <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
                  <h2>{t.home.whatWeDo}</h2>
                  <p>{t.home.whatWeDoSub}</p>
                </Reveal>
              </div>

              <div className="cards-grid">
                <Reveal at={0.15} animation="fade-up" duration={500} delay={0} progress={progress}>
                  <div className="card">
                    <div className="card-icon">
                      <Code size={40} weight="duotone" />
                    </div>
                    <h3>{t.home.techTalks}</h3>
                    <p>{t.home.techTalksDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0.15} animation="fade-up" duration={500} delay={150} progress={progress}>
                  <div className="card">
                    <div className="card-icon">
                      <Wrench size={40} weight="duotone" />
                    </div>
                    <h3>{t.home.workshops}</h3>
                    <p>{t.home.workshopsDesc}</p>
                  </div>
                </Reveal>

                <Reveal at={0.15} animation="fade-up" duration={500} delay={300} progress={progress}>
                  <div className="card">
                    <div className="card-icon">
                      <Handshake size={40} weight="duotone" />
                    </div>
                    <h3>{t.home.networking}</h3>
                    <p>{t.home.networkingDesc}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}
      </Scene>

      {/* Stats with animated counters */}
      <Scene duration="150vh" pin={true}>
        {(progress: number) => (
          <section className="section">
            <div className="section-inner">
              <div className="section-header">
                <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
                  <h2>{t.home.communityNumbers}</h2>
                </Reveal>
              </div>
              <div className="stats-row">
                <div className="stat">
                  <Lightning size={28} weight="duotone" className="stat-icon" />
                  <div className="stat-number">
                    <Counter from={0} to={10} at={0.1} span={0.4} progress={progress} />+
                  </div>
                  <div className="stat-label">{t.home.yearsOfCommunity}</div>
                </div>
                <div className="stat">
                  <CalendarCheck size={28} weight="duotone" className="stat-icon" />
                  <div className="stat-number">
                    <Counter from={0} to={100} at={0.15} span={0.4} progress={progress} />+
                  </div>
                  <div className="stat-label">{t.home.eventsHeld}</div>
                </div>
                <div className="stat">
                  <UsersThree size={28} weight="duotone" className="stat-icon" />
                  <div className="stat-number">
                    <Counter from={0} to={500} at={0.2} span={0.4} progress={progress} />+
                  </div>
                  <div className="stat-label">{t.home.communityMembers}</div>
                </div>
                <div className="stat">
                  <ChatTeardropDots size={28} weight="duotone" className="stat-icon" />
                  <div className="stat-number">
                    <Counter from={0} to={200} at={0.25} span={0.4} progress={progress} />+
                  </div>
                  <div className="stat-label">{t.home.talksGiven}</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Scene>

      {/* CTA */}
      <Scene duration="120vh" pin={true}>
        {(progress: number) => (
          <section className="cta-section">
            <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
              <h2>{t.home.readyToJoin}</h2>
            </Reveal>
            <Reveal at={0.1} animation="fade-up" duration={600} delay={100} progress={progress}>
              <p>{t.home.readyToJoinDesc}</p>
            </Reveal>
            <Reveal at={0.2} animation="fade-up" duration={600} delay={200} progress={progress}>
              <div className="hero-actions">
                <Link to={localePath('/community', locale)} className="btn btn-primary">
                  <UsersThree size={18} weight="bold" />
                  {t.home.joinCommunity}
                </Link>
                <Link to={localePath('/about', locale)} className="btn btn-secondary">
                  {t.home.learnMore}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>
          </section>
        )}
      </Scene>
    </Kino>
  )
}
