import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/context'
import { localePath } from '~/i18n'
import { Kino, Scene, Reveal } from 'react-kino'
import { BookOpen, GraduationCap, Lightbulb, TrendingUp, Users } from 'lucide-react'
import { UsersThree, ShieldCheck } from '@phosphor-icons/react'

export function AboutPage() {
  const { locale, t } = useLocale()

  return (
    <Kino>
      <Scene duration="80vh" pin={true}>
        {(progress: number) => (
          <div className="page-header">
            <Reveal at={0} animation="fade-up" duration={600} progress={progress}>
              <h1>{t.about.title}</h1>
              <p>{t.about.subtitle}</p>
            </Reveal>
          </div>
        )}
      </Scene>

      <div className="prose">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.about.ourStory}</h2>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={100}>
          <p>{t.about.ourStoryP1}</p>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={200}>
          <p>{t.about.ourStoryP2}</p>
        </Reveal>

        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.about.ourMission}</h2>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={100}>
          <p>{t.about.ourMissionP}</p>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={150}>
          <ul className="mission-list">
            <li>
              <GraduationCap size={18} />
              <span><strong>{t.about.learn}</strong> {t.about.missionLearn}</span>
            </li>
            <li>
              <Lightbulb size={18} />
              <span><strong>{t.about.share}</strong> {t.about.missionShare}</span>
            </li>
            <li>
              <Users size={18} />
              <span><strong>{t.about.connect}</strong> {t.about.missionConnect}</span>
            </li>
            <li>
              <TrendingUp size={18} />
              <span><strong>{t.about.grow}</strong> {t.about.missionGrow}</span>
            </li>
          </ul>
        </Reveal>

        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.about.whatWeCover}</h2>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={100}>
          <p>{t.about.whatWeCoverP}</p>
          <ul>
            <li>{t.about.topicFrontend}</li>
            <li>{t.about.topicBackend}</li>
            <li>{t.about.topicFullstack}</li>
            <li>{t.about.topicTypeScript}</li>
            <li>{t.about.topicIoT}</li>
            <li>{t.about.topicTesting}</li>
            <li>{t.about.topicOpenSource}</li>
            <li>{t.about.topicDatabases}</li>
            <li>{t.about.topicPerformance}</li>
          </ul>
        </Reveal>

        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>
            <ShieldCheck size={28} weight="duotone" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            {t.about.codeOfConduct}
          </h2>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={100}>
          <p>{t.about.codeOfConductP1}</p>
        </Reveal>
        <Reveal at={0} animation="fade-up" duration={500} delay={150}>
          <p>{t.about.codeOfConductP2}</p>
        </Reveal>
      </div>

      <section className="section section--alt">
        <div className="section-inner">
          <div className="section-header">
            <Reveal at={0} animation="fade-up" duration={600}>
              <h2>{t.about.theTeam}</h2>
              <p>{t.about.theTeamSub}</p>
            </Reveal>
          </div>
          <Reveal at={0} animation="scale" duration={600} delay={150}>
            <div className="organizers-grid">
              <div className="organizer">
                <img
                  src="https://avatars.githubusercontent.com/u/6867768?v=4"
                  alt="Organizer"
                  className="organizer-avatar"
                  width="100"
                  height="100"
                />
                <h4>{t.about.communityOrganizers}</h4>
                <p>{t.about.wantToHelp}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-section">
        <Reveal at={0} animation="fade-up" duration={600}>
          <h2>{t.about.wantToGetInvolved}</h2>
          <p>{t.about.wantToGetInvolvedDesc}</p>
          <Link to={localePath('/community', locale)} className="btn btn-primary">
            <UsersThree size={18} weight="bold" />
            {t.about.joinCommunity}
          </Link>
        </Reveal>
      </section>
    </Kino>
  )
}
