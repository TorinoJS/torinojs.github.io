import it from './it'
import type { Translations } from './it'
import en from './en'
import { type Locale, DEFAULT_LOCALE } from './types'

export type { Locale, Translations }
export { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_FLAGS, LOCALE_HTML_LANG, LOCALE_OG } from './types'

const translations: Record<Locale, Translations> = { it, en }

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations[DEFAULT_LOCALE]
}

/**
 * Determine locale from a URL pathname.
 * - Paths starting with /en/ or exactly /en -> 'en'
 * - Everything else -> 'it' (default)
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  if (first === 'en') return 'en'
  return DEFAULT_LOCALE
}

/**
 * Build a path for a given locale.
 * For Italian (default): /events -> /events
 * For English: /events -> /en/events
 * For root: / -> / (it) or /en (en)
 */
export function localePath(path: string, locale: Locale): string {
  // Strip any existing locale prefix
  const clean = path.replace(/^\/(en)(\/|$)/, '/')

  if (locale === DEFAULT_LOCALE) {
    return clean || '/'
  }

  if (clean === '/') {
    return `/${locale}`
  }

  return `/${locale}${clean}`
}

/**
 * Get the equivalent path in the other locale (for language switcher).
 */
export function getAlternateLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)

  // Remove existing locale prefix if present
  const hasLocalePrefix = segments[0] === 'en'
  const pathSegments = hasLocalePrefix ? segments.slice(1) : segments
  const cleanPath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/'

  return localePath(cleanPath, targetLocale)
}

const STORAGE_KEY = 'torinojs-locale'

export function getSavedLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'it' || saved === 'en') return saved
  } catch {}
  return null
}

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {}
}

/**
 * Detect user's preferred language from browser settings.
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const langs = navigator.languages ?? [navigator.language]
  for (const lang of langs) {
    const code = lang.toLowerCase().split('-')[0]
    if (code === 'it') return 'it'
    if (code === 'en') return 'en'
  }
  return DEFAULT_LOCALE
}
