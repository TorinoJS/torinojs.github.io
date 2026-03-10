import { Link } from '@tanstack/react-router'
import { useLocale } from '~/i18n/context'
import { localePath } from '~/i18n'

export function Footer() {
  const { locale, t } = useLocale()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>TorinoJS</h3>
          <p>{t.footer.description}</p>
        </div>

        <div className="footer-links">
          <h4>{t.footer.explore}</h4>
          <ul>
            <li>
              <Link to={localePath('/', locale)}>{t.nav.home}</Link>
            </li>
            <li>
              <Link to={localePath('/events', locale)}>{t.nav.events}</Link>
            </li>
            <li>
              <Link to={localePath('/about', locale)}>{t.nav.about}</Link>
            </li>
            <li>
              <Link to={localePath('/community', locale)}>{t.nav.community}</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>{t.footer.connect}</h4>
          <ul>
            <li>
              <a
                href="https://github.com/nicmart/torinojs-branding"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://x.com/AuralJS"
                target="_blank"
                rel="noopener noreferrer"
              >
                X / Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nicmart/torinojs-branding/issues"
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
