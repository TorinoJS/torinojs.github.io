export type Locale = 'it' | 'en'

export const DEFAULT_LOCALE: Locale = 'it'
export const LOCALES: Locale[] = ['it', 'en']

export const LOCALE_LABELS: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  it: 'IT',
  en: 'EN',
}

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  it: 'it',
  en: 'en',
}

export const LOCALE_OG: Record<Locale, string> = {
  it: 'it_IT',
  en: 'en_US',
}
