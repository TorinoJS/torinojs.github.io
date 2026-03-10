import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/context'
import { localePath } from '~/i18n'
import { Home, Calendar, Users, Info, ExternalLink } from 'lucide-react'
import { GithubLogo, XLogo, Microphone } from '@phosphor-icons/react'

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
            <li>
              <GithubLogo size={14} weight="bold" />
              <a
                href="https://github.com/AuralJS"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <XLogo size={14} weight="bold" />
              <a
                href="https://x.com/AuralJS"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
            </li>
            <li>
              <Microphone size={14} weight="bold" />
              <a
                href="https://github.com/AuralJS/discussion/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.footer.proposeTalk}
              </a>
            </li>
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
