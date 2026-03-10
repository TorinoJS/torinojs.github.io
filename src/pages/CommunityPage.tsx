import { useLocale } from '~/i18n/context'
import { Kino, Scene, Reveal } from 'react-kino'

export function CommunityPage() {
  const { locale, t } = useLocale()

  return (
    <Kino>
      <Scene duration="80vh" pin={true}>
        {(progress: number) => (
          <div className="page-header">
            <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
              <h1>{t.community.title}</h1>
              <p>{t.community.subtitle}</p>
            </Reveal>
          </div>
        )}
      </Scene>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <Reveal at={0} animation="fade-up" duration={600}>
              <h2>{t.community.howToConnect}</h2>
              <p>{t.community.howToConnectSub}</p>
            </Reveal>
          </div>

          <div className="cards-grid">
            <Reveal at={0} animation="fade-up" duration={500} delay={0}>
              <a
                href="https://github.com/nicmart/torinojs-branding"
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <div className="card-icon">{'{ }'}</div>
                <h3>{t.community.github}</h3>
                <p>{t.community.githubDesc}</p>
              </a>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={150}>
              <a
                href="https://x.com/AuralJS"
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <div className="card-icon">{'@'}</div>
                <h3>{t.community.twitter}</h3>
                <p>{t.community.twitterDesc}</p>
              </a>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={300}>
              <a
                href="https://github.com/nicmart/torinojs-branding/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ textDecoration: 'none' }}
              >
                <div className="card-icon">{'>>>'}</div>
                <h3>{t.community.proposeTalk}</h3>
                <p>{t.community.proposeTalkDesc}</p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--alt">
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
                <h3>{t.community.speakTitle}</h3>
                <p>{t.community.speakDesc}</p>
              </div>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={100}>
              <div className="card">
                <h3>{t.community.hostWorkshop}</h3>
                <p>{t.community.hostWorkshopDesc}</p>
              </div>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={200}>
              <div className="card">
                <h3>{t.community.volunteer}</h3>
                <p>{t.community.volunteerDesc}</p>
              </div>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={300}>
              <div className="card">
                <h3>{t.community.sponsor}</h3>
                <p>{t.community.sponsorDesc}</p>
              </div>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={400}>
              <div className="card">
                <h3>{t.community.mentor}</h3>
                <p>{t.community.mentorDesc}</p>
              </div>
            </Reveal>

            <Reveal at={0} animation="fade-up" duration={500} delay={500}>
              <div className="card">
                <h3>{t.community.spreadWord}</h3>
                <p>{t.community.spreadWordDesc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.community.joinNextEvent}</h2>
          <p>{t.community.joinNextEventDesc}</p>
          <a
            href="https://github.com/nicmart/torinojs-branding/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t.community.viewUpcoming}
          </a>
        </Reveal>
      </section>
    </Kino>
  )
}
