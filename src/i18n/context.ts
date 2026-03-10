import { createContext, useContext } from 'react'
import type { Locale, Translations } from '~/i18n'
import { DEFAULT_LOCALE, getTranslations } from '~/i18n'

interface LocaleContextValue {
  locale: Locale
  t: Translations
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  t: getTranslations(DEFAULT_LOCALE),
})

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}
