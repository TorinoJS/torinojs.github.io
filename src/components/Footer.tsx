import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/context'
import { localePath } from '~/i18n'
import { Home, Calendar, Users, Info } from 'lucide-react'
import {
  GithubLogo,
  TelegramLogo,
  CalendarBlank,
  Microphone,
  LinkSimple,
} from '@phosphor-icons/react'
import { getFooterContacts, type Contact } from '~/config/contacts'

function FooterContactIcon({ type }: { type: Contact['type'] }) {
  switch (type) {
    case 'github':
      return <GithubLogo size={14} weight="bold" />
    case 'telegram':
      return <TelegramLogo size={14} weight="bold" />
    case 'meetup':
      return <CalendarBlank size={14} weight="bold" />
    case 'microphone':
      return <Microphone size={14} weight="bold" />
    default:
      return <LinkSimple size={14} weight="bold" />
  }
}

/** Map contact id to display label */
function getContactLabel(id: string, t: ReturnType<typeof useLocale>['t']): string {
  const community = t.community as Record<string, unknown>
  return (community[id] as string) ?? id
}

export function Footer() {
  const { locale, t } = useLocale()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-title">
            <img src="/torinojs-logo.svg" alt="TorinoJS" width="32" height="32" />
            <h3>TorinoJS</h3>
          </div>
          <p>{t.footer.description}</p>
        </div>

        <div className="footer-links">
          <h4>{t.footer.explore}</h4>
          <ul>
            <li>
              <Home size={14} />
              <Link to={localePath('/', locale)}>{t.nav.home}</Link>
            </li>
            <li>
              <Calendar size={14} />
              <Link to={localePath('/events', locale)}>{t.nav.events}</Link>
            </li>
            <li>
              <Info size={14} />
              <Link to={localePath('/about', locale)}>{t.nav.about}</Link>
            </li>
            <li>
              <Users size={14} />
              <Link to={localePath('/community', locale)}>{t.nav.community}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>{t.footer.connect}</h4>
          <ul>
            {getFooterContacts().map((contact) => (
              <li key={contact.id}>
                <FooterContactIcon type={contact.type} />
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getContactLabel(contact.id, t)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} TorinoJS. {t.footer.builtWith}{' '}
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noopener noreferrer"
          >
            TanStack Start
          </a>{' '}
          &middot; {t.footer.license}
        </p>
      </div>
    </footer>
  )
}
