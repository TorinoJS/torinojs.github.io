import { Link, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import { useLocale } from '~/i18n/context'
import {
  localePath,
  getAlternateLocalePath,
  saveLocale,
  LOCALE_FLAGS,
  LOCALE_LABELS,
  type Locale,
} from '~/i18n'
import { Menu, X } from 'lucide-react'
import { GithubLogo, XLogo } from '@phosphor-icons/react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const { locale, t } = useLocale()

  const isActive = (path: string) => {
    const localized = localePath(path, locale)
    const normalizedCurrent = currentPath.replace(/\/$/, '') || '/'
    const normalizedTarget = localized.replace(/\/$/, '') || '/'
    return normalizedCurrent === normalizedTarget
  }

  const otherLocale: Locale = locale === 'it' ? 'en' : 'it'
  const switchPath = getAlternateLocalePath(currentPath, otherLocale)

  const handleLanguageSwitch = () => {
    saveLocale(otherLocale)
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to={localePath('/', locale)} className="header-logo">
          <img
            src="/torinojs-logo.svg"
            alt="TorinoJS"
            width="40"
            height="40"
          />
          TorinoJS
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t.header.toggleNav}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`header-nav ${isOpen ? 'open' : ''}`}>
          <Link
            to={localePath('/', locale)}
            className={isActive('/') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {t.nav.home}
          </Link>
          <Link
            to={localePath('/events', locale)}
            className={isActive('/events') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {t.nav.events}
          </Link>
          <Link
            to={localePath('/about', locale)}
            className={isActive('/about') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {t.nav.about}
          </Link>
          <Link
            to={localePath('/community', locale)}
            className={isActive('/community') ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            {t.nav.community}
          </Link>
        </nav>

        <div className="header-actions">
          <a
            href={switchPath}
            className="lang-switch"
            onClick={handleLanguageSwitch}
            title={LOCALE_LABELS[otherLocale]}
            aria-label={`Switch to ${LOCALE_LABELS[otherLocale]}`}
          >
            {LOCALE_FLAGS[otherLocale]}
          </a>
          <div className="header-socials">
            <a
              href="https://github.com/AuralJS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubLogo size={22} weight="bold" />
            </a>
            <a
              href="https://x.com/AuralJS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
            >
              <XLogo size={22} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
